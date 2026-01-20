/*global QUnit*/

sap.ui.define([
	"eshm/controller/eshm.controller"
], function (Controller) {
	"use strict";

	QUnit.module("eshm Controller");

	QUnit.test("I should test the eshm controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
