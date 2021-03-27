const moment = require('moment')


module.exports = {
    formatDate: function(date, format) {
        return moment(date).format(format)
    },
    ifEquals: function(arg1, arg2, options) {
        return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    }
}