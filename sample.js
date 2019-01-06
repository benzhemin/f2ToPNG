const fs = require('fs');
const path = require('path');

const Canvas = require('canvas'); // 引入 node canvas

// 引入 F2: start
const F2 = require('@antv/f2/lib/core'); // 引入核心包
require('@antv/f2/lib/geom/'); // 几何标记对象
require('@antv/f2/lib/geom/adjust/'); // 数据调整
require('@antv/f2/lib/coord/polar'); // 极坐标系
require('@antv/f2/lib/component/axis/circle'); // 极坐标系下的弧长坐标轴
require('@antv/f2/lib/scale/time-cat'); // timeCat 类型的度量
require('@antv/f2/lib/component/guide'); // 加载 guide 组件
const Guide =  require('@antv/f2/lib/plugin/guide'); // Guide 插件
const Legend =  require('@antv/f2/lib/plugin/legend'); // Legend 插件
F2.Chart.plugins.register([ Legend, Guide ]); // 注册以上插件
// 引入 F2: end

const canvas = Canvas.createCanvas(375, 900, /*'pdf'*/); // 创建 canvas 对象

// 使用 F2 绘制饼图
function drawPie() {
  const data = [
    { name: '芳华', percent: 0.4, a: '1' },
    { name: '妖猫传', percent: 0.2, a: '1' },
    { name: '机器之血', percent: 0.18, a: '1' },
    { name: '心理罪', percent: 0.15, a: '1' },
    { name: '寻梦环游记', percent: 0.05, a: '1' },
    { name: '其他', percent: 0.02, a: '1' }
  ];
  const chart = new F2.Chart({
    el: canvas,
    width: 375,
    height: 260,
    padding: [ 45, 'auto', 'auto' ],
    pixelRatio: 2
  });
  chart.source(data, {
    percent: {
      formatter(val) {
        return val * 100 + '%';
      }
    }
  });
  chart.legend({
    position: 'right'
  });
  chart.coord('polar', {
    transposed: true,
    radius: 0.85
  });
  chart.axis(false);
  chart.interval()
    .position('a*percent')
    .color('name', [ '#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0' ])
    .adjust('stack')
    .style({
      lineWidth: 1,
      stroke: '#fff',
      lineJoin: 'round',
      lineCap: 'round'
    });

  chart.render();

}

function drawSquare() {
  var data = [{
    name: 'London',
    月份: 'Jan.',
    月均降雨量: 18.9
  }, {
    name: 'London',
    月份: 'Feb.',
    月均降雨量: 28.8
  }, {
    name: 'London',
    月份: 'Mar.',
    月均降雨量: 39.3
  }, {
    name: 'London',
    月份: 'Apr.',
    月均降雨量: 81.4
  }, {
    name: 'London',
    月份: 'May.',
    月均降雨量: 47
  }, {
    name: 'London',
    月份: 'Jun.',
    月均降雨量: 20.3
  }, {
    name: 'London',
    月份: 'Jul.',
    月均降雨量: 24
  }, {
    name: 'London',
    月份: 'Aug.',
    月均降雨量: 35.6
  }, {
    name: 'Berlin',
    月份: 'Jan.',
    月均降雨量: 12.4
  }, {
    name: 'Berlin',
    月份: 'Feb.',
    月均降雨量: 23.2
  }, {
    name: 'Berlin',
    月份: 'Mar.',
    月均降雨量: 34.5
  }, {
    name: 'Berlin',
    月份: 'Apr.',
    月均降雨量: 99.7
  }, {
    name: 'Berlin',
    月份: 'May.',
    月均降雨量: 52.6
  }, {
    name: 'Berlin',
    月份: 'Jun.',
    月均降雨量: 35.5
  }, {
    name: 'Berlin',
    月份: 'Jul.',
    月均降雨量: 37.4
  }, {
    name: 'Berlin',
    月份: 'Aug.',
    月均降雨量: 42.4
  }];

  const chart = new F2.Chart({
    el: canvas,
    width: 375,
    height: 260,
    padding: [ 50, 'auto', 'auto' ],
    pixelRatio: 2
  });

  chart.source(data);
  
  chart.interval().position('月份*月均降雨量').color('name').adjust({
    type: 'dodge',
    marginRatio: 0.05 // 设置分组间柱子的间距
  });
  chart.render();
}

drawPie();
drawSquare();

var writeStream = canvas.createPNGStream().pipe(fs.createWriteStream(path.join(__dirname, 'pie11.png'))) // 导出图片
writeStream.on('finish', function() {
  console.log('write successful');
});