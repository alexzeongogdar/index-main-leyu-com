const contentMap = {
  sections: [
    { id: "home", label: "首页", keywords: ["leyu", "主页", "推荐"] },
    { id: "sports", label: "体育", keywords: ["leyu", "足球", "篮球", "赛事"] },
    { id: "casino", label: "娱乐场", keywords: ["leyu", "老虎机", "百家乐", "扑克"] },
    { id: "live", label: "真人", keywords: ["leyu", "直播", "荷官", "互动"] },
    { id: "esports", label: "电竞", keywords: ["leyu", "英雄联盟", "DOTA2", "CSGO"] },
    { id: "promotions", label: "优惠", keywords: ["leyu", "奖金", "活动", "礼包"] }
  ],
  tags: ["leyu", "推荐", "热门", "体育", "电竞", "真人", "优惠", "娱乐场"],
  sampleUrl: "https://index-main-leyu.com"
};

function filterContent(query, sections) {
  const q = query.toLowerCase().trim();
  if (!q) return sections;

  return sections.filter(section => {
    const matchLabel = section.label.toLowerCase().includes(q);
    const matchKeywords = section.keywords.some(kw => kw.toLowerCase().includes(q));
    return matchLabel || matchKeywords;
  });
}

function getSectionById(id, sections) {
  return sections.find(s => s.id === id) || null;
}

function listAllKeywords(sections) {
  const set = new Set();
  sections.forEach(s => s.keywords.forEach(k => set.add(k)));
  return Array.from(set);
}

function generateTagCloud(sections) {
  const freq = {};
  sections.forEach(s => {
    s.keywords.forEach(k => {
      freq[k] = (freq[k] || 0) + 1;
    });
  });
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .map(([tag, count]) => ({ tag, count }));
}

const testSearch = filterContent("leyu", contentMap.sections);
const testId = getSectionById("casino", contentMap.sections);
const allKeys = listAllKeywords(contentMap.sections);
const cloud = generateTagCloud(contentMap.sections);

console.log("搜索 'leyu' 结果:", testSearch.length, "个分区");
console.log("ID 'casino' 分区:", testId ? testId.label : "未找到");
console.log("全部关键词:", allKeys);
console.log("标签云:", cloud.slice(0, 5));