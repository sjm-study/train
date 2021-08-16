export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            authority: ['admin', 'user'],
            routes: [
              {
                path: '/',
                redirect: '/home',
              },
              {
                path: '/home',
                name: 'home',
                icon: 'smile',
                component: './Home',
              },
              {
                path: '/order',
                name: 'order',
                icon: 'smile',
                component: './Order',
                // hideInMenu: true
              },
              {
                path: '/order/detail/:id',
                name: 'orderDetail',
                icon: 'smile',
                component: './Order/Detail',
                hideInMenu: true,
              },
              {
                path: 'products',
                name: 'products',
                icon: 'smile',
                routes: [
                  {
                    path: '/products/productList',
                    name: 'productList',
                    icon: 'smile',
                    component: './Products/ProductList',
                  },
                  {
                    path: '/products/classificationList',
                    name: 'classificationList',
                    icon: 'smile',
                    component: './Products/ClassificationList',
                  },
                  {
                    path: '/products/productList/editProduct',
                    name: 'editProduct',
                    icon: 'smile',
                    component: './Products/EditProduct',
                    hideInMenu: true,
                  },
                  {
                    path: '/products/productList/addProduct',
                    name: 'addProduct',
                    icon: 'smile',
                    component: './Products/EditProduct',
                    hideInMenu: true,
                  },
                  {
                    path: '/products/classificationList/addClassification',
                    name: 'addClassification',
                    icon: 'smile',
                    component: './Products/EditClassification',
                    hideInMenu: true,
                  },
                  {
                    path: '/products/classificationList/editClassification',
                    name: 'editClassification',
                    icon: 'smile',
                    component: './Products/EditClassification',
                    hideInMenu: true,
                  },
                ],
              },
              {
                path: '/customer',
                name: 'customer',
                icon: 'smile',
                component: './Customer/CustomerList',
              },
              {
                path: '/customer/detail',
                name: 'customerDetail',
                icon: 'smile',
                component: './Customer/Detail',
                hideInMenu: true,
              },
              {
                path: '/setUp',
                name: 'setUp',
                icon: 'smile',
                component: './SetUp',
              },
              {
                path: '/admin',
                name: 'admin',
                icon: 'crown',
                component: './Admin',
                authority: ['admin'],
                routes: [
                  {
                    path: '/admin/sub-page',
                    name: 'sub-page',
                    icon: 'smile',
                    component: './Welcome',
                    authority: ['admin'],
                  },
                ],
              },
              {
                name: 'list.table-list',
                icon: 'table',
                path: '/list',
                component: './TableList',
              },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
