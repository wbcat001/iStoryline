document.addEventListener('DOMContentLoaded', function () {
    // 与えられた点
    const points = [
      { x: 100, y: 200 },
      { x: 300, y: 200 },
      { x: 500, y: 150 },
      { x: 700, y: 250 }
    ];

    // 点をx座標とy座標に分解
    const pointX = points.map(point => point.x);
    const pointY = points.map(point => point.y);

    // スプライン曲線のデータ
    const curve = {
      x: pointX,
      y: pointY,
      mode: 'lines+markers',
      type: 'scatter',
      name: 'Spline Curve',
      line: { shape: 'spline' },
      marker: { size: 8, color: 'red' }
    };

    
    var xData = [];
    var yData = [];

    var colors = [];

    var lineSize = [];

    var labels = []; // character name

    var data = [];

    for (var i=0; i<xData.length; i++){
        
    }


    // プロットするデータ
    const data = [curve]; // add curve



    // レイアウトの設定
    const layout = {
      title: 'Spline Curve through Given Points',
      xaxis: { range: [0, 800] },
      yaxis: { range: [0, 600] },
      showlegend: false,
      xaxis:{
        showline: true,
        showgrid: false,
        linewidth: 2,
        linecolor: 'rgb(0,0,0)',
        autotick: false,
        ticks: "outside",
        tickcolor: 'rgb(204,204,204)',
        tickwidth: 2,
        ticklen: 5,
        tickfont: {
        family: 'Arial',
        size: 12,
        color: 'rgb(82, 82, 82)'
        }
        },
      yaxis: {
        showgrid: false,
        zeroline: false,
        showline: false,
        showticklabels: false
      },

      annotations: [
        {
             text: 'Main Source for News', //
             showarrow: false,
        }
      ]

    };

    // プロットを描画
    Plotly.newPlot('plot', data, layout);
  });