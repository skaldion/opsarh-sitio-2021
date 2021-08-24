import $ from 'jquery';
import Popper from 'popper';
import bootstrapModal from '../node_modules/bootstrap/js/src/modal';
import bootstrapCarousel from '../node_modules/bootstrap/js/src/carousel';
import bootstrapDropdown from '../node_modules/bootstrap/js/src/dropdown';
import bootstrapCollapse from '../node_modules/bootstrap/js/src/collapse';

$(document).ready(function() {
	var width = window.screen.width - 30;
	var height = width * 0.45;
	var colors = ['#39d0ff', '#00326d', '#2d76b2']

	function getCanvasCenter() {
		return `${width / 2},${height / 2}`;
	}

	//Simple animated example of d3-cloud - https://github.com/jasondavies/d3-cloud
	//Based on https://github.com/jasondavies/d3-cloud/blob/master/examples/simple.html

	// Encapsulate the word cloud functionality
	function wordCloud(selector) {

		var fill = (index) => {
			console.log(index, index%3, colors[index%3])
			return colors[index%3]
		};
		// var fill = d3.scale.category20();

		//Construct the word cloud's SVG element
		var svg = d3
			.select(selector)
			.append('svg')
			.classed('word-cloud-svg', true)
			.attr('width', width)
			.attr('height', height)
			.append('g')
			.attr('transform', 'translate(' + getCanvasCenter() + ')');


		//Draw the word cloud
		function draw(words) {
			var cloud = svg.selectAll('g text')
				.data(words, function(d) {
					return d.text;
				});

			//Entering words
			cloud.enter()
				.append('text')
				.style('font-family', 'Impact')
				.style('fill', function(d, i) {
					return fill(i);
				})
				.attr('text-anchor', 'middle')
				.attr('font-size', 1)
				.text(function(d) {
					return d.text;
				});

			//Entering and existing words
			cloud
				.transition()
				.duration(600)
				.style('font-size', function(d) {
					return d.size + 'px';
				})
				.attr('transform', function(d) {
					return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')';
				})
				.style('fill-opacity', 1);

			//Exiting words
			cloud.exit()
				.transition()
				.duration(200)
				.style('fill-opacity', 1e-6)
				.attr('font-size', 1)
				.remove();
		}


		//Use the module pattern to encapsulate the visualisation code. We'll
		// expose only the parts that need to be public.
		return {

			//Recompute the word cloud for a new set of words. This method will
			// asycnhronously call draw when the layout has been computed.
			//The outside world will need to call this function, so make it part
			// of the wordCloud return value.
			update: function(words) {
				d3.layout.cloud().size([width, height])
					.words(words)
					.padding(5)
					.rotate(function() {
						return ~~(Math.random() * 2) * (90);
					})
					.font('Impact')
					.fontSize(function(d) {
						return d.size;
					})
					.on('end', draw)
					.start();
			},
			remove: function() {
				svg.remove()
				svg = null
				var plop = $('.word-cloud-svg')
				plop.attr('width', 0)
				plop.attr('height', 0)
			}
		};
	}

	var words = [
		'Change Management', 'Diseño Organizacional', 'Compensaciones',
		'Agentes de Cambio', 'Lean', 'Aumento de productividad', 'Desempeño',
		'Reclutamiento', 'Capacitación', 'Liderazgo', 'Talento', 'Bonos', 'Team building',
		'Alineación de objetivos'
	];

	function getWords() {
		var multiplier = width >= 1000
			? 1
			: width/1000
		return words.map(function(d) {
			return { text: d, size: 10 + Math.random() * (60*multiplier) };
		});
	}

	var myWordCloud = wordCloud('#word-cloud');
	var drawingTimeout;

	function loopWordCloud() {
		myWordCloud.update(getWords());
		drawingTimeout = setTimeout(function() {
			loopWordCloud();
		}, 5000);
	}

	function resizeDone() {
		width = window.screen.width - 30;
		height = width * 0.45;
		clearTimeout(drawingTimeout);
		myWordCloud.remove()

		requestAnimationFrame(function() {
			myWordCloud = wordCloud('#word-cloud');
			loopWordCloud();
		})

	}

	var resizeThreshold;

	window.onresize = function() {
		clearTimeout(resizeThreshold);
		resizeThreshold = setTimeout(function() {
			requestAnimationFrame(resizeDone)
		}, 500);
	};

	loopWordCloud();
});

export { bootstrapModal, bootstrapCarousel, bootstrapDropdown };
