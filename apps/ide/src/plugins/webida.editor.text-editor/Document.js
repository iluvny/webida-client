/*
* Copyright (c) 2012-2015 S-Core Co., Ltd.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

/**
 * Constructor
 * Document
 *
 * @see
 * @since: 2015.07.15
 * @author: hw.shim
 */

// @formatter:off
define([
    'webida-lib/plugins/workbench/ui/EditorModel',
    'webida-lib/plugins/workbench/ui/PartModel',
    'webida-lib/util/genetic',
    'webida-lib/util/logger/logger-client'
], function(
    EditorModel,
    PartModel,
    genetic, 
    Logger
) {
    'use strict';
// @formatter:on

    /**
     * @typedef {Object} DataSource
     */

    var logger = new Logger();
    //logger.setConfig('level', Logger.LEVELS.log);
    //logger.off();

    function Document(text) {
        logger.info('new Document(' + text + ')', this);

        PartModel.call(this, text);

        this.text = '';

        if ( typeof text === 'undefined' || text === null) {
            text = '';
        }
        if ( typeof text === 'object') {
            text = text.toString();
        }

        this.setContents(text);
    }


    genetic.inherits(Document, EditorModel, {

        /**
         * From given data, build new contents for the model.
         * @param {String} data Source data to build new contents of the model.
         */
        createContents: function(data) {
            this.setSerialized(data);
            this.setContents(data);
        },

        /**
         * @param {String} data Serialized original data, such as Ajax response.
         */
        setSerialized: function(data) {
            this.serialized = data;
        },

        /**
         * @return {String} Serialized data to save
         */
        getSerialized: function() {
            return this.serialized;
        },

        /**
         * Serializes model to a string
         * For Document, just return it's working text.
         * @return {String} Serialized Data
         */
        serialize: function() {
            return this.text;
        },

        /**
         * @param {string} text
         * @param {Viewer} [viewer]
         */
        setContents: function(text, viewer) {
            this.text = text;
        },

        /**
         * @return {string}
         */
        getContents: function() {
            return this.text;
        },

        /**
         * @param {TextChangeRequest} request
         */
        update: function(request) {
            logger.info('update(' + request + ')');
            var old = this.getContents();
            var text = request.getContents();
            if (old !== text) {
                this.setContents(text);
                this.emit(PartModel.CONTENTS_CHANGE, request);
            }
        },

        /**
         * Alias for setContents with respect to Document
         * @param {string} text
         * @param {Viewer} [viewer]
         */
        setText: function(text, viewer) {
            this.setContents(text, viewer);
        },

        /**
         * Alias for setContents with respect to Document
         * @return {string}
         */
        getText: function() {
            return this.getContents();
        },

        /**
         * @return {number}
         */
        getLength: function() {
            return this.getContents().length;
        },

        /**
         * @return {string}
         */
        getCharAt: function(position) {
            return this.getContents().charAt(position);
        },

        /**
         * @return {number}
         */
        getNumberOfLines: function() {
            return this.getContents().split(/\r\n|\r|\n/).length;
        },

        toString: function() {
            var suffix = '';
            var res = '<' + this.constructor.name + '>#' + this._partModelId;
            if (this.getContents()) {
                if (this.getLength() > 10) {
                    suffix = '...';
                }
                res += '(' + this.text.substr(0, 10) + suffix + ')';
            }
            return res;
        }
    });

    return Document;
});
