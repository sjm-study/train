/**
 * request 网络请求工具
 */
import axios from 'axios';
//  import { getLocale } from 'umi-plugin-react/locale';

// import { notification } from 'antd';

// const codeMessage = {
//   200: '服务器成功返回请求的数据。',
//   201: '新建或修改数据成功。',
//   202: '一个请求已经进入后台排队（异步任务）。',
//   204: '删除数据成功。',
//   400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
//   401: '用户没有权限（令牌、用户名、密码错误）。',
//   403: '用户得到授权，但是访问是被禁止的。',
//   404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
//   406: '请求的格式不可得。',
//   410: '请求的资源被永久删除，且不会再得到的。',
//   422: '当创建一个对象时，发生一个验证错误。',
//   500: '服务器发生错误，请检查服务器。',
//   502: '网关错误。',
//   503: '服务不可用，服务器暂时过载或维护。',
//   504: '网关超时。',
// };

// 添加请求拦截器
axios.interceptors.request.use((config) => {
  const set = config;
  set.headers.Authorization = JSON.parse(localStorage.getItem('token')) || '';
  //  set.headers['X-LANG'] = getLocale();
  return set;
});

/**
 * 正常响应和异常拦截器
 * 统一处理网络错误，是希望给错误有个统一规划，防止有错误的时候没有提示，以为是正常的。
 * 但是放在这里有个问题：当页面已经捕获错误并给用户友好提示以后，这里的错误提示其实是没必要的。
 * 但是放在这里就没法屏蔽掉。
 * 更好的错误处理应该是：API统一处理->Model处理->组件处理->全局处理
 */
axios.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // const { response } = error;
    // if (response && response.status) {
    //   const errorText = codeMessage[response.status] || response.statusText;
    //   const { status } = response;
    //   notification.error({
    //     message: `请求错误 ${status}`,
    //     description: errorText,
    //   });
    // } else if (!response) {
    //   notification.error({
    //     description: '您的网络发生异常，无法连接服务器',
    //     message: '网络异常',
    //   });
    // }
    throw error;
  },
);

export default axios;
