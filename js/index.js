import $ from 'jquery';
import Popper from 'popper';
import bootstrapModal from '../node_modules/bootstrap/js/src/modal';
import bootstrapCarousel from '../node_modules/bootstrap/js/src/carousel';
import bootstrapDropdown from '../node_modules/bootstrap/js/src/dropdown';
import bootstrapCollapse from '../node_modules/bootstrap/js/src/collapse';

$(document).ready(() => {
	$('.needs-validation').each(function() {
		const form = $(this);
		form.submit(function(event) {
			if (form[0].checkValidity() === false) {
				event.preventDefault()
				event.stopPropagation()
			}
			form.addClass('was-validated')
		})
	})
});

export { bootstrapModal, bootstrapCarousel, bootstrapDropdown };
