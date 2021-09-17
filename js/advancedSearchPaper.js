'use strict';

define(['util', 'paper/search_option', 'jq', 'tagsInput'], function (util, search_option) {
    search_option.setOptionCountLimit(5);
    window.search_option = search_option;

    var init = function () {
        search_option.changeKeywordsRangeCss();
        search_option.initBtnShow();
    };

    var search = function () {
        $("#paperSearchForm").postSubmit({url: "/paper/search/searchPaper"});
    }

    return {
        init: init,
        search: search
    };
});