const width = 1000;
const height = 500;
const margin = 30;
const svg  = d3.select('#scatter-plot')
            .attr('width', width)
            .attr('height', height);

let xParam = 'fertility-rate';
let yParam = 'child-mortality';
let radius = 'gdp';
let year = '2000';

const params = ['child-mortality', 'fertility-rate', 'gdp', 'life-expectancy', 'population'];
const colors = ['aqua', 'lime', 'gold', 'hotpink']

// Шкалы для осей и окружностей
const x = d3.scaleLinear().range([margin*2, width-margin]);
const y = d3.scaleLinear().range([height-margin, margin]);

const xLable = svg.append('text').attr('transform', `translate(${width/2}, ${height})`);
const yLable = svg.append('text').attr('transform', `translate(${margin/2}, ${height/2}) rotate(-90)`);

// Part 1: задайте атрибуты 'transform' для осей
const xAxis = svg.append('g') // .attr('transform', ... 
const yAxis = svg.append('g')// .attr('transform', ...


// Part 2: Шкалы для цвета и радиуса объектов
// const color = d3.scaleOrdinal()...
// const r = d3.scaleSqrt()...

// Part 2: для элемента select задайте options (http://htmlbook.ru/html/select) и установить selected для начального значения
// d3.select('#radius').selectAll('option')
//         ...


// Part 3: select с options для осей
// ...


loadData().then(data => {

    console.log(data)

    // Part 2: получитe все уникальные значения из поля 'region' при помощи d3.nest и установите их как 'domain' цветовой шкалы
    //let regions = d3.nest()...
    //color.domain(regions);

    d3.select('.slider').on('change', newYear);

    d3.select('#radius').on('change', newRadius);

    // Part 3: подпишитесь на изменения селекторов параметров осей
    // ...

    function newYear(){
        year = this.value;
        updateChart()
    }

    function newRadius(){
        // Part 2: задайте логику обработки по аналогии с newYear
    }
    function updateChart(){
        xLable.text(xParam);
        yLable.text(yParam);
        d3.select('.year').text(year);

        // поскольку значения показателей изначально представленны в строчном формате преобразуем их в Number при помощи +
        let xRange = data.map(d=> +d[xParam][year]);
        x.domain([d3.min(xRange), d3.max(xRange)]);

        xAxis.call(d3.axisBottom(x));    

        // Part 1: реализуйте отображение оси 'y'
        // ...
        
        // Part 2: реализуйте обновление шкалы радиуса
        // ...

        // Part 1, 2: реализуйте создание и обновление состояния точек
        // svg.selectAll('circle').data(data)
        //     ...
    }
    
    updateChart();
});


async function loadData() {
    const population = await d3.csv('data/pop.csv');
    const rest = { 
        'gdp': await d3.csv('data/gdppc.csv'),
        'child-mortality': await d3.csv('data/cmu5.csv'),
        'life-expectancy': await d3.csv('data/life_expect.csv'),
        'fertility-rate': await d3.csv('data/tfr.csv')
    };
    const data = population.map(d=>{
        return {
            geo: d.geo,
            country: d.country,
            region: d.region,
            population: {...d},
            ...Object.values(rest).map(v=>v.find(r=>r.geo===d.geo)).reduce((o, d, i)=>({...o, [Object.keys(rest)[i]]: d }), {})
            
        }
    })
    return data
}