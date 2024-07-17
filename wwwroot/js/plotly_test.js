
/*

*/


// document.addEventListener('DOMContentLoaded', function () 
document.getElementById('uploadForm').addEventListener('submit', async (event) => {
  
  event.preventDefault();

  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];

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
      showticklabels: false,
      
      },
    yaxis: {
      showgrid: false,
      zeroline: false,
      showline: false,
      showticklabels: false
    },
    annotations: [
      {
        xref: 'paper',
        yref: 'paper',
        x: 0.0,
        y: 1.05,
        xanchor: 'left',
        yanchor: 'bottom',
        text: '', //
        font:{
          family: 'Arial',
          size: 30,
          color: 'rgb(37,37,37)'
        },
        showarrow: false
      },
      {
        xref: 'paper',
        yref: 'paper',
        x: 0.5,
        y: -0.1,
        xanchor: 'center',
        yanchor: 'top',
        text: '', //
        showarrow: false,
        font: {
          family: 'Arial',
          size: 12,
          color: 'rgb(150,150,150)'
        }
      }
    ]
  };

  if(file){
    try{
      const identifier = await uploadFile(file);

      const result = await layoutStoryline(identifier);
      
      var data = [];

      var colors = [];

      var lineSize = [];

      const labels = result.array.map(x => x.name); // character name

  
     
      
      // draw line of each character
      for (var c=0; c< result.array.length; c++){

        // divide points to X and Y.
        var pointX = result.array[c].points.map(point => point.item1);
        var pointY = result.array[c].points.map(point => - point.item3);

        // data of spline 
        var curve = {
          x: pointX,
          y: pointY,
          mode: 'lines+markers',
          type: 'scatter',
          name: 'Spline Curve',
          line: { shape: 'spline' },
          marker: { size: 8, color: 'black' }
        };

        // data of marker
        var mark = {
          x: pointX,
          y: pointY,
          type: "scatter",
          mode: "markers",
          marker: {
            color: "red",
            size: 3
          }
        };

        data.push(curve, mark);

        var nameAnnotation = {
          xref: "paper",
          x: 0.05,
          y: pointY[0],
          xanchor: "left",
          yanchor: "middle",
          text: labels[c],
          showarrow: false,

        };
        console.log("annotaion");
        layout.annotations.push(nameAnnotation, nameAnnotation);

      }



    // plot
    Plotly.newPlot('plot', data, layout);

      }catch(error){
        document.getElementById("resultOutput").textContent = "Error: " + error.message;
      }
    }else{
      alert("Please select a file");
    }
  });
    /*
    // 与えられた点
    const result = {
      "array": [
        {
          "character_id": 0,
          "name": "A",
          "points": [
            {
              "item1": 0,
              "item2": 10,
              "item3": 177
            },
            {
              "item1": 10,
              "item2": 100,
              "item3": 180
            },
            {
              "item1": 100,
              "item2": 120,
              "item3": 180
            },
            
          ]
        }
      ]

    };
    */

    //
    
  

async function uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('http://localhost:5050/api/upload', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        if (data.error === 0) {
            return data.data.identifier; // Return the identifier for layout
        } else {
            throw new Error('File upload error: ' + data.message);
        }
    } catch (error) {
        console.error('Upload Error:', error);
        throw error;
    }
}

async function layoutStoryline(identifier) {
    try {
        const response = await fetch('http://localhost:5050/api/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: identifier })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        if (data.error === 0) {
            return {
                array: data.data.array,
                perm: data.data.perm,
                sessionTable: data.data.sessionTable
            };
        } else {
            throw new Error('Layout update error: ' + data.message);
        }
    } catch (error) {
        console.error('Layout Error:', error);
        throw error;
    }
}
    