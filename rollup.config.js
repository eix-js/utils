import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

const dist = './dist'

export default {
	input: './src/index.ts',
	output: [
		{
			file: `${dist}/bundle.cjs.js`,
			format: 'cjs'
		},
		{
			file: `${dist}/bundle.esm.js`,
			format: 'esm'
		},
		{
			name: 'EixCore',
			file: `${dist}/bundle.umd.js`,
			format: 'umd'
		}
	],
	plugins: [
		resolve({
			extensions: ['.ts']
		}),
		babel({
			exclude: 'node_modules/**',
			extensions: ['ts']
		}),
		terser()
	]
}
