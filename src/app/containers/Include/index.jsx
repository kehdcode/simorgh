import React from 'react';
import root from 'react-shadow';
import styled from 'styled-components';
import { GridItemConstrainedMedium } from '#lib/styledGrid';

const visMarkup = `<script>    window.vjConfigObject = window.vjConfigObject || {};    window.vjConfigObject['newsspec-19077-brexit-glossary-app'] = {"js":true,"output":{"wrapper":"embed"},"name":"newsspec-19077-brexit-glossary","version":"1.2.16","urlToOutputDir":"https://news.files.bbci.co.uk/include/newsspec/19077-brexit-glossary","assetsPath":"https://news.files.bbci.co.uk/include/newsspec/19077-brexit-glossary/assets/app-project-assets","includeName":"app","language":"english","textDirection":"ltr","serviceName":"news","serviceNameNative":"News","vocab":{"jargon-term-button-1":"Brexit day","jargon-term-button-2":"Customs plan","jargon-term-button-3":"Divorce bill","jargon-term-button-4":"Settled status","jargon-term-button-5":"Transition period","jargon-term-button-6":"WTO rules","reset-button-text":"Reset","core-content":"Please upgrade your browser","title":"Your guide to Brexit jargon","cta":"Use the list below or select a button","lookup-label":"Enter the word or phrase you are looking for","lookup-placeholder":"e.g. Brexit","search-error":"No terms found.","lookup-screenreader-submit":"Search","search-screenreader-autosuggest-help":"results are available, use up and down arrow keys to navigate."},"outputs":[{"wrapper":"embed"},{"wrapper":"core"},{"wrapper":"envelope"},{"wrapper":"amp"},{"wrapper":"full-width"},{"wrapper":"news-app"},{"wrapper":"syndication"},{"wrapper":"facebook","height":960,"withMargins":"yes"},{"wrapper":"applenews","photoCaption":"","photoURL":"","hyperlinkCallToAction":"Click or tap here to see interactive content"}],"autoFixLintingErrors":false,"failFast":false,"includePath":{"responsive":true,"newsapps":true,"app-image":"https://placehold.it/640x360","app-clickable":true,"amp-clickable":true,"amp-image-height":360,"amp-image-width":640,"amp-image":"https://placehold.it/640x360"},"languages":["english"],"uncompressedAppBudget":"(1024 * 1000) * 0.5","shadowDom":true,"projectNamespace":"newsspec-19077-brexit-glossary","outputDir":"include/newsspec/19077-brexit-glossary","pathToWrapperAssets":"https://news.files.bbci.co.uk/include/newsspec/19077-brexit-glossary/assets/embed","pathToInclude":"https://news.files.bbci.co.uk/include/newsspec/19077-brexit-glossary/english/app/embed","pathToWrapperAssetsToInclude":"https://news.files.bbci.co.uk/include/newsspec/19077-brexit-glossary/english/app/embed"};</script><link rel="stylesheet" href="https://news.files.bbci.co.uk/include/newsspec/19077-brexit-glossary/assets/embed/css/inline.css"><div id="responsive-embed-newsspec-19077-brexit-glossary-app" class="bbc-news-vj-embed-wrapper">    <div id="responsive-embed-newsspec-19077-brexit-glossary-app-core-content">        <div class="brexit-glossary">            <div class="gel-wrap">                <div class="gel-layout">                    <div class="gel-layout__item gel-1/1" id="core-content">                        <p>Please upgrade your browser</p>                    </div>                </div>            </div>                    <div class="gel-wrap">                <div class="gel-layout">                    <div class="gel-layout__item gel-1/1" id="full-experience" style="display: none">                        <img class="brexit-logo" alt="" src="https://news.files.bbci.co.uk/include/newsspec/19077-brexit-glossary/assets/app-project-assets/brexit_logo--small.png" />                        <h2>Your guide to Brexit jargon</h2>                        <p class="cta">Use the list below or select a button</p>                        <div class="input-form"></div>                        <div class="input-form__buttons"></div>                        <div class="results-view"></div>                    </div>                </div>            </div>        </div>    </div></div><style id="responsive-embed-newsspec-19077-brexit-glossary-app-inline-css">    false</style><script>    (function(){function cutsTheMustard() {    return (        document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#BasicStructure', '1.1') &&        'querySelector' in document &&        'localStorage' in window &&        'addEventListener' in window    );}                    if (cutsTheMustard()) {                                    function initEmbed() {                require(['https://news.files.bbci.co.uk/include/newsspec/19077-brexit-glossary/assets/embed/js/embed-init.js?v=1.2.16'], function (initFullFatApplication) {                    initFullFatApplication(vjConfigObject['newsspec-19077-brexit-glossary-app']);                });            }            if (typeof require === 'undefined') {                var headTag = document.getElementsByTagName('head')[0],                    requireTag = document.createElement('script');                requireTag.type = 'text/javascript';                requireTag.src = 'https://news.files.bbci.co.uk/include/vjassets/js/vendor/require-2.1.20b.min.js';                requireTag.onload = initEmbed;                headTag.appendChild(requireTag);            } else {                initEmbed();            }                    }                    else if (window.require) {                        require(['istats-1'], function (istats) {                            istats.log('browser does not cut the mustard', 'newsspec-nonuser');});}})();</script>`;

const Include = () => {
  return (
    <GridItemConstrainedMedium>
      <root.div className="shadow">
        <div dangerouslySetInnerHTML={{ __html: visMarkup }} />
      </root.div>
    </GridItemConstrainedMedium>
  );
};

export default Include;
