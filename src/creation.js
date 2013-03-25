var messageToken = "this message is awesome";

function Creation() {

}

Creation.prototype.setMessageTemplate = function (template) {
    this.template = template;
};

Creation.prototype.getMessageTemplate = function () {
    return this.template;
};

Creation.prototype.execute = function (scoredBy, assistedBy, response) {
    var html = this.template.toString()
        .replace(messageToken,
            "saved: goal scored by player " + scoredBy + " and assisted by player " + assistedBy);

    response.write(html);
	response.end();
};

module.exports = Creation; 