import { Component } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-doughnut-chart',
  standalone: true,
  imports: [],
  templateUrl: './doughnut-chart.component.html',
  styleUrl: './doughnut-chart.component.css'
})
export class DoughnutChartComponent {

  public chart: any;

  ngOnInit(): void {
    this.createChart();
  }

  createChart(){
    this.chart = new Chart("MyChart", {
      type: 'doughnut', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['Red', 'Pink','Green','Yellow','Orange','Blue', ],
        datasets: [{
          label: 'My First Dataset',
          data: [300, 240, 100, 432, 253, 34],
          backgroundColor: [
            'red',
            'pink',
            'green',
            'yellow',
            'orange',
            'blue',
          ],
          hoverOffset: 4
        }],
      },
      options: {
        onClick: (e,item) => {
          console.log(e, this.chart)
          console.log ('legend onClick', e);
          console.log('legd item', item);
        },
        onMouseEnter: function(evt: any, elements: any) {
          console.log("hover chart!");
        },
        plugins: {
          // @ts-ignore
          htmlLegend: {
            // ID of the container to put the legend in
            containerID: 'legend-container',
          },
          legend: {
            display: false,
          },
        }
      },
      plugins: [this.htmlLegendPlugin,
        {
          id: 'myEventCatcher',
          beforeEvent(chart, args, pluginOptions) {
            const event = args.event;
            if (event.type === 'mouseout') {
              // process the event
              console.log('mouseout catch');
            }
          }
        }],

    });

    var canvas = document.getElementById("myChart");
    var chart = this.chart
    canvas!.onclick = function(evt) {
      var activePoints = chart.getElementsAtEvent(evt);
      if (activePoints[0]) {
        var chartData = activePoints[0]['_chart'].config.data;
        var idx = activePoints[0]['_index'];

        var label = chartData.labels[idx];
        var value = chartData.datasets[0].data[idx];

        console.log(idx, " - ", value);
      }
    };
  }
  static getOrCreateLegendList = (chart: any, id: any) => {
    const legendContainer = document.getElementById(id);
    let listContainer = legendContainer?.querySelector('ul');

    if (!listContainer) {
      listContainer = document.createElement('ul');
      listContainer.style.display = 'flex';
      listContainer.style.flexDirection = 'row';
      listContainer.style.margin = "0";
      listContainer.style.padding = "0";

      legendContainer?.appendChild(listContainer);
    }
    return listContainer;
  };

  htmlLegendPlugin = {
    id: 'htmlLegend',

    afterUpdate(chart: any, args: any, options: any) {
      const div = document.getElementById("legend-container-angular")
      const ul = DoughnutChartComponent.getOrCreateLegendList(chart, options.containerID);

      if(ul.childNodes.length<1){


      // Remove old legend items
      while (ul.firstChild) {
        ul.firstChild.remove();
      }

      // Reuse the built-in legendItems generator
      const items = chart.options.plugins.legend.labels.generateLabels(chart);

      items.forEach((item: { index: any; datasetIndex: any; fillStyle: string; strokeStyle: string; lineWidth: string; fontColor: string; hidden: any; text: string; }) => {
        console.log("this is ", item.text)

        const li = document.createElement('li');
        li.style.alignItems = 'center';
        li.style.cursor = 'pointer';
        li.style.display = 'flex';
        li.style.flexDirection = 'row';
        li.style.margin = '10px';
        li.style.borderWidth ="1px"
        li.style.borderColor = '#000';
        li.style.border='1px solid black'
        li.style.width='100px'
        li.style.height='100px'

        li.onmouseenter = (event) => {
          console.log("mouse over", JSON.stringify(chart.data))
          chart.toggleDataVisibility(item.index);
          chart.update();
        }
        li.onmouseleave = () => {
          console.log("mouse out", item.text)
          chart.toggleDataVisibility(item.index);
          chart.update();
        }
        li.onclick = () => {
          const {type} = chart.config;
          if (type === 'pie' || type === 'doughnut') {
            // Pie and doughnut charts only have a single dataset and visibility is per item
            chart.toggleDataVisibility(item.index);
          } else {
            chart.setDatasetVisibility(item.datasetIndex, !chart.isDatasetVisible(item.datasetIndex));
          }
          chart.update();
        };

        // Color box
        const boxSpan = document.createElement('span');
        boxSpan.style.background = item.fillStyle;
        boxSpan.style.borderColor = item.strokeStyle;
        boxSpan.style.borderWidth = item.lineWidth + 'px';
        boxSpan.style.display = 'inline-block';
        boxSpan.style.height = '20px';
        boxSpan.style.marginRight = '10px';
        boxSpan.style.width = '20px';

        // Text
        const textContainer = document.createElement('p');
        textContainer.style.color = item.fontColor;
        textContainer.style.margin = "0";
        textContainer.style.padding = "0";
        textContainer.style.textDecoration = item.hidden ? 'line-through' : '';

        const text = document.createTextNode(item.text);
        textContainer.appendChild(text);

        li.appendChild(boxSpan);
        li.appendChild(textContainer);
        ul.appendChild(li);
      });
      }
    }
  };
}
