describe("new goal page", function(){

    it("posts the goals information on submit", function(){
//        spyOn($, "ajax");
//        $('submit').click();
//        expect($.ajax.mostRecentCall.args[0]["url"]).toEqual("/goals");

        console.log("THIS IS AWESOME");

        spyOn($, "ajax").andCallFake(function(options) {
            console.log("YEAHHHHH BABY");
            options.success();
        });
        var callback = jasmine.createSpy();
        $('submit').click();
        console.log("I CLICKED THE BITCH");

        expect(callback).toHaveBeenCalled();
    });

    it("doesnt send get in submit", function(){

    });

    it("displays the goal message on return", function(){

    });
});
