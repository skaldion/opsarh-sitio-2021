import $ from 'jquery';
import Popper from 'popper';
import bootstrapModal from '../node_modules/bootstrap/js/src/modal';
import bootstrapCarousel from '../node_modules/bootstrap/js/src/carousel';
import bootstrapDropdown from '../node_modules/bootstrap/js/src/dropdown';
import bootstrapCollapse from '../node_modules/bootstrap/js/src/collapse';

$(document).ready(() => {

	var color = d3.scaleOrdinal(d3.schemePastel1);

	var layout = cloud()
		.size([500, 500])
		.words([
			'Hello', 'world', 'normally', 'you', 'want', 'more', 'words',
			'than', 'this'].map(function(d, i) {
			return {
				text: d,
				size: 10 + Math.random() * 90,
				fill: color(i)
			};
		}))
		.padding(5)
		.rotate(function() {
			return ~~(Math.random() * 2) * 90;
		})
		.font('Impact')
		.fontSize(function(d) {
			return d.size;
		})
		.on('end', draw);

	layout.start();

	function draw(words) {
		d3.select('body').append('svg')
			.attr('width', layout.size()[0])
			.attr('height', layout.size()[1])
			.append('g')
			.attr('transform', 'translate(' + layout.size()[0] / 2 + ',' + layout.size()[1] / 2 + ')')
			.selectAll('text')
			.data(words)
			.enter().append('text')
			.style('font-size', function(d) {
				return d.size + 'px';
			})
			.style('font-family', 'Impact')
			.style('fill', function(d) {
				return d.fill
			})
			.attr('text-anchor', 'middle')
			.attr('transform', function(d) {
				return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')';
			})
			.text(function(d) {
				return d.text;
			});
	}
});

export { bootstrapModal, bootstrapCarousel, bootstrapDropdown };
