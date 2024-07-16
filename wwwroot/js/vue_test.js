new Vue({
    el: '#app',
    data: {
      points: [100, 150, 300, 200, 500, 150, 700, 250] // 5組の座標 (x1, y1, x2, y2, x3, y3, x4, y4)
    },
    mounted() {
      this.drawBezierCurve();
    },
    methods: {
      drawBezierCurve() {
        const canvas = this.$refs.canvas;
        const ctx = canvas.getContext('2d');
        const points = this.points;

        if (points.length !== 8) {
          console.error('4組の座標が必要です。');
          return;
        }

        // ベジェ曲線を描く
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.moveTo(points[0], points[1]); // 開始点

        // 制御点1, 制御点2, 終点
        ctx.bezierCurveTo(points[2], points[3], points[4], points[5], points[6], points[7]);

        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }
  });