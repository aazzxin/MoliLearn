const ApiRootUrl = 'https://molicaen.cn/api/'

export default {
  IndexUrl: ApiRootUrl + 'index/index', // 首页数据接口
  CatalogList: ApiRootUrl + 'catalog/index', // 分类目录全部分类数据接口
  CatalogCurrent: ApiRootUrl + 'catalog/current', // 分类目录当前分类数据接口

  AuthLoginByWeixin: ApiRootUrl + 'auth/loginByWeixin', // 微信登录

  UserinfoUrl: ApiRootUrl + 'users/info', // 用户业务信息

  CardsMenu: ApiRootUrl + 'cards/menu', // 编辑题库目录
  AddCard: ApiRootUrl + 'cards/add', // 添加题库
  EditQuestions: ApiRootUrl + 'questions/editList', // 编辑的题目列表
  SaveEdit: ApiRootUrl + 'cards/save', // 保存修改题库

  CardTotal: ApiRootUrl + 'cards/total', // 题库总题数
  QuestionsList: ApiRootUrl + 'questions/list', // 题目列表
  SubmitAnswer: ApiRootUrl + 'questions/submit', // 提交答案

  CollectList: ApiRootUrl + 'collect/list', // 收藏列表
  CollectAddOrDelete: ApiRootUrl + 'collect/addordelete', // 添加或取消收藏

  CommentList: ApiRootUrl + 'comment/list', // 评论列表
  CommentCount: ApiRootUrl + 'comment/count', // 评论总数
  CommentPost: ApiRootUrl + 'comment/post', // 发表评论

  TopicList: ApiRootUrl + 'topic/list', // 专题列表
  TopicDetail: ApiRootUrl + 'topic/detail', // 专题详情
  TopicRelated: ApiRootUrl + 'topic/related', // 相关专题

  SearchIndex: ApiRootUrl + 'search/index', // 搜索页面数据
  SearchResult: ApiRootUrl + 'search/result', // 搜索数据
  SearchHelper: ApiRootUrl + 'search/helper', // 搜索帮助
  SearchClearHistory: ApiRootUrl + 'search/clearhistory', // 搜索帮助

  FootprintList: ApiRootUrl + 'footprint/list', // 足迹列表
  FootprintDelete: ApiRootUrl + 'footprint/delete' // 删除足迹
}
