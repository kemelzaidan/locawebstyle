describe("Track Events: ", function() {
  beforeEach(function() {
    loadFixtures('track-events_fixture.html');
    $("body").attr("data-ls-te-category", "locastyle#track-events-test");
    locastyle.trackEvents.init();
  });

  describe("Initialization", function () {
    describe("Check ga presence before init finding functions", function () {
      it("should set gaPresent to TRUE when window.ga is exists", function () {
        expect(locastyle.trackEvents.gaPresent).toEqual(true);
      });

      it("should set gaPresent to FALSE when window.ga does not exists", function () {
        window.ga = null;
        locastyle.trackEvents.init($(document));
        expect(locastyle.trackEvents.gaPresent).toEqual(false);
      });
    });
  });

  describe("Common links", function () {
    describe("When click on link on #home_menu_sample", function () {
      it("should call ga with expected options as arguments", function () {
        var expectedOptions = {
          category: "locastyle#track-events-test",
          action: "open_link_#/home",
          label: "Open link sample"
        }
        spyOn(window, "ga");
        $("#open_links #home_menu_sample").trigger("click.ls");
        expect(window.ga).toHaveBeenCalledWith('send', 'event', expectedOptions.category, expectedOptions.action, expectedOptions.label);
      });
    });

    describe('Unbind: When trackEvents is initialized multiple times', function () {
      it('the ga should not be called multiple times', function () {
        spyOn(window, "ga");
        locastyle.trackEvents.init();
        locastyle.trackEvents.init();
        $("#open_links #home_menu_sample").trigger("click.ls");
        expect(window.ga.calls.count()).toEqual(1);
      });
    });

    describe("Optional action and label: When click on link on #link_with_options", function () {
      it("should call ga with expected options as arguments", function () {
        var expectedOptions = {
          category: "locastyle#track-events-test",
          action: "my_custom_action",
          label: "my_custom_label"
        }
        spyOn(window, "ga");
        $("#open_links #link_with_options").trigger("click.ls");
        expect(window.ga).toHaveBeenCalledWith('send', 'event', expectedOptions.category, expectedOptions.action, expectedOptions.label);
      });
    });

    describe('Without data-ls-te-category on body: When click on #link_with_options', function () {
      it('should create attribute automatic on body', function () {
        $("body").removeAttr("data-ls-te-category");
        locastyle.trackEvents.init();
        var expectedOptions = {
          category: window.location.pathname,
          action: "my_custom_action",
          label: "my_custom_label"
        }
        spyOn(window, "ga");
        $("#open_links #link_with_options").trigger("click.ls");
        expect(window.ga).toHaveBeenCalledWith('send', 'event', expectedOptions.category, expectedOptions.action, expectedOptions.label);
      });
    });

    describe("On page links", function () {
      describe("When click on #on_page_link_to_nowhere which has the # as href attribute", function () {
        it("should call ga with expected iptions as arguments", function () {
          var expectedOptions = {
            category: "locastyle#track-events-test",
            action: "on_page_link_#",
            label: "On page link sample"
          }
          spyOn(window, "ga");
          $("#on_page_links #on_page_link_to_nowhere").trigger("click");
          expect(window.ga).toHaveBeenCalledWith('send', 'event', expectedOptions.category, expectedOptions.action, expectedOptions.label);
        });
      });

      describe("When click on #on_page_link_with_anchor which has the #nice-target as href attribute", function () {
        it("should call ga with expected iptions as arguments", function () {
          var expectedOptions = {
            category: "locastyle#track-events-test",
            action: "on_page_link_#nice-target",
            label: "On page link sample"
          }
          spyOn(window, "ga");
          $("#on_page_links #on_page_link_with_anchor").trigger("click");
          expect(window.ga).toHaveBeenCalledWith('send', 'event', expectedOptions.category, expectedOptions.action, expectedOptions.label);
        });
      });
    });
  });

  describe("Buttons", function () {
    describe("When click on link on #common_on_page_button", function () {
      it("should call ga with expected options as arguments", function () {
        var expectedOptions = {
          category: "locastyle#track-events-test",
          action: "on_page_button_#",
          label: "On page button"
        }
        spyOn(window, "ga");
        $("#on_page_buttons #common_on_page_button").trigger("click.ls");
        expect(window.ga).toHaveBeenCalledWith('send', 'event', expectedOptions.category, expectedOptions.action, expectedOptions.label);
      });
    });

    describe("When click on link on #common_on_page_button", function () {
      it("should call ga with expected options as arguments", function () {
        var expectedOptions = {
          category: "locastyle#track-events-test",
          action: "on_page_button_#",
          label: "On page button"
        }
        spyOn(window, "ga");
        $("#on_page_buttons #common_on_page_button").trigger("click.ls");
        expect(window.ga).toHaveBeenCalledWith('send', 'event', expectedOptions.category, expectedOptions.action, expectedOptions.label);
      });
    });
  });

  describe("Forms", function () {
    describe("When submit the #my_sample_form", function () {
      it("should call ga with expected options as arguments", function () {
        var expectedOptions = {
          category: "locastyle#track-events-test",
          action: "submit_form_#my_sample_form",
          label: "Submit"
        }
        spyOn(window, "ga");
        $("#my_sample_form").trigger("submit");
        expect(window.ga).toHaveBeenCalledWith('send', 'event', expectedOptions.category, expectedOptions.action, expectedOptions.label);
      });
    });
  });

});
