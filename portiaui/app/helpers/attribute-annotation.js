import Ember from 'ember';

export default Ember.Helper.extend({
    annotationStructure: Ember.inject.service(),

    model: null,

    init() {
        this._super();
        this.get('annotationStructure').register(this, this.recompute);
    },

    willDestroy() {
        this._super();
        this.get('annotationStructure').unRegister(this, this.recompute);
    },

    compute([element, attribute]) {
        const structure = this.get('annotationStructure');
        const annotations =  structure.annotationsFor(element) || [];
        return annotations.find(annotation =>
            (structure.elementsFor(annotation) || []).includes(element) &&
            annotation.getWithDefault('attribute', null) === attribute) || {};
    }
});