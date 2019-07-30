import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript';
import replace from 'rollup-plugin-replace';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';

const plugins = [
    replace({
        "process.env.NODE_ENV": JSON.stringify('production')
    }),
    commonjs({
        include: 'node_modules/**',
        namedExports: {
            // 'node_modules/react-redux/es/index.js': ['default'],
            'node_modules/react-is/index.js': ['isValidElementType', 'isContextConsumer'],
            // 'node_modules/prop-types/index.js': ['default']
        }
    }),
    resolve(),
    typescript(),
];

export default [{
        plugins,
        input: './src/Store/Store.ts',
        output: {
            dir: './build/chunks',
            name: 'af_store',
            format: 'es',
        }
    },
    {
        plugins: [...plugins, uglify()],
        input: './src/Components/TextComponent/index.tsx',
        external: ['react', 'react-dom'],
        output: {
            globals: {
                'react': 'React',
                'react-dom': 'ReactDOM'
            },
            name: 'TextComponent',
            sourcemap: false,
            file: './build/text-component.js',
            format: 'iife'
        }
    }
];