/* global QUnit */
require(['plugins/webida.editor.text-editor/TextEditorPart'], function (TextEditorPart) {
    'use strict';
    var editor = new TextEditorPart();
    QUnit.test('editor API Validation', function (assert) {
        assert.ok(typeof editor.create === 'function', 'create() method exists');
        assert.ok(typeof editor.destroy === 'function', 'destroy() method exists');
		assert.ok(typeof editor.show === 'function', 'show() method exists');
		assert.ok(typeof editor.hide === 'function', 'hide() method exists');
		assert.ok(typeof editor.focus === 'function', 'focus() method exists');
		assert.ok(typeof editor.getValue === 'function', 'getValue() method exists');
		assert.ok(typeof editor.addChangeListener === 'function', 'addChangeListener() method exists');
		assert.ok(typeof editor.markClean === 'function', 'markClean() method exists');
		assert.ok(typeof editor.isClean === 'function', 'isClean() method exists');
    });
});