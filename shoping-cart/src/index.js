import dva from 'dva';
import './index.css';
// import 'font-awesome/css/font-awesome.css'
// import 'antd/dist/antd.css'

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/Cart').default);
app.model(require('./models/Product').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
