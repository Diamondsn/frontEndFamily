module.exports = {
  title: 'Front End Family',
  description: 'A family of front end knowledge',
  base: '/frontEndFamily/',
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    sidebar: {
      '/basic/': [
        {
          title: '编程',
          collapsable: false,
          children: [
            'program'
          ],
        },
        {
          title: '算法',
          collapsable: false,
          children: [
            'algorithm'
          ],
        },
        {
          title: '数据结构',
          collapsable: false,
          children: [
            'dataStruct'
          ],
        },
        {
          title: 'HTML',
          collapsable: false,
          children: [
            'html'
          ],
        },
        {
          title: 'CSS',
          collapsable: false,
          children: [
            'css'
          ],
        },
        {
          title: 'javaScript',
          collapsable: false,
          children: [
            'javascript'
          ],
        },
        {
          title: 'Node.js',
          collapsable: false,
          children: [
            'node'
          ],
        },
        {
          title: '网络',
          collapsable: false,
          children: [
            'network'
          ],
        },
        {
          title: '操作系统',
          collapsable: false,
          children: [
            'operateSystem'
          ],
        }
      ],
    },
    nav: [
      {
        text: '基础知识',
        link: '/basic/',
      },
      {
        text: 'Github',
        link: 'https://github.com/Diamondsn/frontEndFamily',
      }
    ],
    serviceWorker: true,
    lastUpdated: "更新时间",
    docsDir: "docs",
    editLinks: true,
    editLinkText: "帮助我完善这篇内容🙏",
  },
}
