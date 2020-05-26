#!/usr/bin/env node

const fs = require('fs');
const path = require("path");
const readline = require('readline');


// replicate minimist
const args = process.argv.slice(2);
const argv = { _: [] };

while(args.length) {
	const arg = args.shift();

	if (arg.startsWith('-')) {
		argv[arg[1]] = true;
	}
	else {
		argv._.push(arg);
	}
}

// K, now we start

let pattern = argv._[0];
const files = argv._.slice(1);

const several_files = files.length > 1;
const case_sensitive = !argv.i;

if (!case_sensitive) {
	pattern = pattern.toLowerCase();
}

// to be called once per input file
function next() {
	if (files.length <= 0) return;

	const filename = files.shift();
	const full_path = path.resolve(__dirname, filename);

	let match_count = 0;
	let no_match_count = 0;
	let line_number = 0;

	const rl = readline.createInterface({
	    input: fs.createReadStream(filename),
	    output: null,
	    console: false
	});

	rl.on('line', input => {
		line = case_sensitive ? input : input.toLowerCase()
		line_number++;

		const match = argv.x
			? (line === pattern)
			: line.includes(pattern)
		;

		if (match) {
			match_count++;
		}
		else {
			no_match_count++;
		}

		if (argv.l) return;

		const should_print = argv.v ? !match : match;

		if (should_print) {
			console.log(`${several_files ? `${full_path}:` : ''}${argv.n ? `${line_number}:` : ''}${input}`);
		}
	});

	rl.on('close', () => {
		if (argv.l) {
			const should_print = argv.v ? no_match_count : match_count;

			if (should_print) {
				console.log(filename);
			}
		}

		next();
	});
}

next();
