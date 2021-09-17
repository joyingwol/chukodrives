'use strict';

define(['util', 'jq'], function (util) {

    var optionCountLimit = 5;

    var setOptionCountLimit = function (count1) {
        optionCountLimit = count1
    }

    //修改keywordsRange CSS 选中样式
    var changeKeywordsRangeCss = function () {

        // alert("changeKeywordsRangeCss");

        $("[name=keywordsRange]").change(function () {
            $("[name=keywordsRange]").next().removeClass("it-blue");
            $("[name=keywordsRange]:checked").next().addClass("it-blue");
        })
    }


    /**
     * 获取关键词，或者作者的数量
     */
    var getKeywordsCount = function (id) {
        var count = $("#" + id).children().length;

        if (id === "keywordsDiv") {
            return count - 3;
        } else if (id === "authorsDiv") {
            return count - 2;
        }
        return count;
    }

    /**
     * 添加关键词
     */
    var addKeywords = function () {
        var keywordsIndex = getKeywordsCount('keywordsDiv');

        if (keywordsIndex >= optionCountLimit) {
            return;
        }

        var last = $("#keywordsDiv").children().last();
        var newlast = last.clone();

        last.children("select").attr("name", "keywordList[" + keywordsIndex + "].operator")
        last.children("input").attr("name", "keywordList[" + keywordsIndex + "].option")
        last.show();

        $("#keywordsDiv").append(newlast);
        showOrHideAddBtn("keywordsDiv");
    }

    /**
     * 删除关键词或作者
     * @param obj
     * @param firstItem
     */
    var removeKeywords = function (obj, firstItem) {
        var divId = $(obj).parent().parent().parent().attr("id");

        /**
         * 如果是第一个元素，则将后面元素中的内容填进来，再删除第二个元素
         */
        if (firstItem) {
            var nextVal = $(obj).parent().parent().next().find("input").val();
            $(obj).parent().parent().find("input").val("");
            $(obj).parent().parent().find("input").val(nextVal);

            var displayItem = $(obj).parent().parent().next().css('display');

            if (displayItem !== 'none') {
                $(obj).parent().parent().next().remove();
            }
            showOrHideAddBtn(divId);
            return;
        }

        $(obj).parent().parent().remove();
        showOrHideAddBtn(divId);
    }

    /**
     * 显示或隐藏按钮
     * @param divId
     */
    var showOrHideAddBtn = function (divId) {
        var keywordsIndex = getKeywordsCount(divId);
        // var keywordsCount = keywordsIndex;

        // console.log("==============" + $("#" + divId).find(".addSpanBtn").length);

        $("#" + divId).find(".minSpanBtn").show();
        $("#" + divId).find(".addSpanBtn").hide();

        // if (keywordsCount == 1) {
        //     $("#" + divId).find(".minSpanBtn").eq(0).hide();
        // } else {
        //     $("#" + divId).find(".minSpanBtn").eq(0).show();
        // }

        if (keywordsIndex < optionCountLimit) {
            $("#" + divId).find(".addSpanBtn").eq(-2).show();
        }

    }

    /**
     * 添加作者
     */
    var addAuthors = function () {
        var keywordsIndex = getKeywordsCount('authorsDiv');

        if (keywordsIndex >= optionCountLimit) {
            return;
        }

        var last = $("#authorsDiv").children().last();
        var newlast = last.clone();

        last.children("select").attr("name", "authorList[" + keywordsIndex + "].operator")
        last.children("input").attr("name", "authorList[" + keywordsIndex + "].option")
        last.show();

        $("#authorsDiv").append(newlast);
        showOrHideAddBtn("authorsDiv");
    }


    var addJournals = function () {
        var journalDiv = $(".journalHide").eq(0);
        $(journalDiv).appendTo("#journalsDiv");
        journalDiv.removeClass("journalHide").addClass("journalShow");
        showOrHideJournalAddBtn();
    }

    var removeJournals = function (obj) {
        var thisDiv = $(obj).parent().parent();
        $(thisDiv).find("input").val("");
        var jcount = $(".journalShow").length;

        if (jcount > 1) {
            $(thisDiv).addClass("journalHide").removeClass("journalShow");
        }
        showOrHideJournalAddBtn();
    }

    /**
     * 控制 + - 按钮显示
     */
    var initBtnShow = function () {
        showOrHideJournalAddBtn();
        showOrHideAddBtn("authorsDiv");
        showOrHideAddBtn("keywordsDiv");
    };

    var showOrHideJournalAddBtn = function () {
        var jcount = $(".journalShow").length;

        $("#journalsDiv").find(".minSpanBtn").show();
        $("#journalsDiv").find(".addSpanBtn").hide();

        // if (jcount == 1) {
        //     $(".journalShow").eq(0).find(".minSpanBtn").hide();
        // }

        if (jcount < optionCountLimit) {
            $(".journalShow").eq(-1).find(".addSpanBtn").show();
        }
    }

    return {
        addKeywords: addKeywords,
        removeKeywords: removeKeywords,
        removeJournals: removeJournals,
        addAuthors: addAuthors,
        addJournals: addJournals,
        changeKeywordsRangeCss: changeKeywordsRangeCss,
        setOptionCountLimit: setOptionCountLimit,
        showOrHideJournalAddBtn: showOrHideJournalAddBtn,
        initBtnShow: initBtnShow
    };
});