module.exports = {
  head: [
    ['link', { rel: 'icon', href: '/logo.jpg' }],
    [
      'script', {}, `
    var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?707b0d3dc20b0c5f71accce694cd2e7c";
      var s = document.getElementsByTagName("script")[0]; 
      s.parentNode.insertBefore(hm, s);
    })();
    </script>
    `
    ]],
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
      '/notes/': [
        {
          title: '《JavaScript 教程》读书笔记',
          collapsable: true,
          children: [
            'JavaScript'
          ],
        },
        {
          title: '《ECMAScript 6 入门教程》读书笔记',
          collapsable: true,
          children: [
            'es6'
          ],
        },
        {
          title: '《即将到来的 ECMAScript 2022 新特性》文章笔记',
          collapsable: true,
          children: [
            'es2022'
          ],
        },
      ]
    },
    nav: [
      {
        text: '基础知识',
        link: '/basic/',
      },
      {
        text: '读书笔记',
        link: '/notes/'
      },
    ],
    repo: 'https://github.com/Diamondsn/frontEndFamily',
    repoLabel: '查看源码',
    docsBranch: 'main',
    nextLinks: true,
    prevLinks: true,
    serviceWorker: true,
    lastUpdated: "更新时间",
    docsDir: "docs",
    editLinks: true,
    editLinkText: "帮助我完善这篇内容🙏",
    sidebarDepth: 4,
  },
}
