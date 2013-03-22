var messageToken = "this message is awesome";

function Creation() {

}

Creation.prototype.setMessageTemplate = function(template) {
	this.template = template;
}

Creation.prototype.getMessageTemplate = function() {
	return this.template;
}

Creation.prototype.execute = function(request, response) {
	var html = this.template.toString()
		.replace(messageToken, 
				 "saved: goal scored by player 23 and assisted by player 10");
	response.write(html);
};

module.exports = Creation; 