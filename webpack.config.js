module.exports = {
    entry: './app/app.jsx',
    output: {
        path: __dirname,
        filename: './public/bundle.js'
    },
    resolve: {
        root: __dirname,
        alias: {
            Main: 'app/components/Main.jsx',
            Login: 'app/components/Login.jsx',
            SignUp: 'app/components/SignUp.jsx',
            Navbar: 'app/components/Navbar.jsx',
            Requests: 'app/components/Requests.jsx',
            UserMain: 'app/components/UserMain.jsx',
            UsersList: 'app/components/UsersList.jsx',
            RequestLists: 'app/components/RequestLists.jsx',
        },
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                },
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/
            }
        ]
    }
};
