/**
 * @file Working with interactions logic for Platea-Editor.
 * @author Juan Quintero <juan_seb.quintero@uao.edu.co>
 * @version 0.5
 */

(function () {
    var init = function PlateaTimeline() {
        /**
          * The Interaction definition.
          * @constructor
          * @param {String} id - The ID of the Interaction.
          * @param {String} name - A given name for the interaction.
          * @param {String} type - Type of Interaction(Hotspot, Indexing, etc.).
          * @param {Number} startTime - Show time for the interaction.
          * @param {Number} endTime - End of the interaction.
        */
        var Interaction = function (id, name, type, startTime, endTime) {
            this.id = id,
                this.name = name,
                this.type = type,
                this.startTime = startTime,
                this.endTime = endTime
        };

        /**
         * Calculates duration time using self starTime and endTime properties.
         */
        Interaction.prototype.calculateDuration = function () {
            this.duration = this.endTime - this.startTime;
        }

        /**
         * Set a color for an UI representation.
        */
        Interaction.prototype.setColor = function () {
            var type = this.type;
            switch (type) {
                case 'Hotspot':
                    this.color = '#B71C1C';
                    break;
                default:
                    console.warn('Type is not defined.');
                    break;
            }
        }

        /**
         * Add data property into the Object.
         * @param {Object} object - Data given by users in the editor.
         */
        Interaction.prototype.addData = function (object) {
            this.data = object;
        }

        /**
         * Array for saving all Interactions.
         */
        var interactions = [];

        /**
         * Create an Interaction, add it to the array and calculate 
         * the duration time.
         * @param {String} id - The ID of the Interaction.
         * @param {String} name - A given name for the interaction.
         * @param {String} type - Type of Interaction(Hotspot, Indexing, etc.).
         * @param {Number} startTime - Show time for the interaction.
         * @param {Number} endTime - End of the interaction.
         */
        addInteraction = function (id, name, type, startTime, endTime) {
            var interaction = new Interaction(
                id, name, type, startTime, endTime
            );
            interaction.calculateDuration();
            interaction.setColor();
            interactions.push(interaction);
        }

        /**
         * Change start time of an interaction and recalculates its duration.
         * @param {String} id - The ID of the Interaction.
         * @param {Number} newStartTime - New start time for interaction.
         */
        changeStartTime = function (id, newStartTime) {
            var match = getInteraction(id);
            match.startTime = newStartTime;
            match.calculateDuration();
        }

        /**
         * Public method to add data to an Interaction.
         * @param {String} id - The ID of the Interaction.
         * @param {Object} object - Data given by users in the editor.
         */
        addInteractionData = function (id, object) {
            var match = getInteraction(id);
            match.addData(object);
        }

        /**
         * Get an Interaction from array by id.
         * @param {String} id - The ID of the Interaction.
         */
        getInteraction = function (id) {
            return interactions.filter(x => x.id === id)[0];
        }

        /**
         * Get all Interaction from array.
         */
        getInteractions = function () {
            return interactions;
        }

        /**
         * Remove an Interaction from array by id.
         * @param {String} id - The ID of the Interaction.
         */
        removeInteraction = function (id) {
            var match = getInteraction(id);
            interactions.splice(interactions.indexOf(match), 1);
        }

        /**
         * Return functions that will be seen by users.
         */
        return {
            addInteraction,
            changeStartTime,
            getInteraction,
            addInteractionData,
            removeInteraction,
            getInteractions
        }
    };

    /**
     * Set PlateaTimeline as Global instance.
     */

    if (!window.PlateaTimeline) window.PlateaTimeline = new init();
})(window);

/*
window.PlateaTimeline.addInteraction('001', 'botonRojo', 'Hotspot', 10, 30);
window.PlateaTimeline.changeStartTime('001', 25);
window.PlateaTimeline.addInteractionData('001', {
    type: 'Hotspot'
});
console.log(window.PlateaTimeline.getInteraction('001'));
window.PlateaTimeline.removeInteraction('001');
window.PlateaTimeline.addInteraction('002', 'botonAzul', 'Hotspot', 10, 30);
console.log(PlateaTimeline.getInteractions());
*/