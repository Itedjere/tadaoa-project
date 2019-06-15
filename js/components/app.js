'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this.handleChange = function (e) {
            if (["suite", "tenant", "sqft", "rent", "lease", "year"].includes(e.target.dataset.name)) {
                var incomeInfo = [].concat(_toConsumableArray(_this.state.income_info));
                incomeInfo[e.target.dataset.id][e.target.dataset.name] = e.target.value;
                _this.setState({ income_Info: incomeInfo }, function () {});
            } else {
                _this.setState(_defineProperty({}, e.target.name, e.target.value));
            }
        };

        _this.addNewInfo = function (e) {
            _this.setState(function (prevState) {
                return {
                    income_info: [].concat(_toConsumableArray(prevState.income_info), [{
                        suite: '',
                        tenant: '',
                        sqft: '',
                        rent: '',
                        lease: '',
                        year: ''
                    }])
                };
            });
        };

        _this.increment = function (e) {
            _this.setState(function (prev) {
                return {
                    step: prev.step + 1
                };
            });
        };

        _this.decrement = function (e) {
            _this.setState(function (prev) {
                return {
                    step: prev.step - 1
                };
            });
        };

        _this.handleSubmit = function (e) {
            e.preventDefault();
        };

        _this.postDataToServer = function (e) {
            //call your api script here
            e.preventDefault();
            _this.setState({ inProgress: true });
            axios({
                method: "post",
                url: _this.state.appurl,
                headers: { "content-type": "application/json" },
                data: _this.state
            }).then(function (result) {
                if (result.data.sent) {
                    _this.setState({
                        mailSent: result.data.sent
                    });
                    _this.setState({ error: false, inProgress: false });
                } else {
                    _this.setState({ error: true, inProgress: false });
                }
            }).catch(function (error) {
                return _this.setState({ error: error.message, inProgress: false });
            });
        };

        _this.state = {
            appurl: 'http://tadaoa.com/api/sign_document/index.php',
            email: 'support@tadaoa.com',
            clientname: '',
            glarea: '',
            vacantarea: '',
            askingrent: '',
            propertyaddress: '',
            taxaccno: '',
            pgincome: '',
            agincome: '',
            income_info: [{
                suite: '',
                tenant: '',
                sqft: '',
                rent: '',
                lease: '',
                year: ''
            }],
            propertytaxes: '',
            insurance: '',
            management: '',
            maintenance: '',
            water: '',
            repairs: '',
            gas: '',
            janitoria: '',
            electric: '',
            trashremoval: '',
            advertising: '',
            legalfees: '',
            others: '',
            taxes1: '',
            insurance1: '',
            electric1: '',
            repairs1: '',
            trashremoval1: '',
            janitorial1: '',
            maintenance1: '',
            others1: '',
            step: 1,
            totalReimbursement: 0,
            totalExpenses: 0,
            mailSent: false,
            error: null,
            inProgress: false
        };
        return _this;
    }

    _createClass(App, [{
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            //console.log(this.initTotalRent);
            //calculate total reimbursement
            if (this.state.taxes1 !== prevState.taxes1 || this.state.insurance1 !== prevState.insurance1 || this.state.electric1 !== prevState.electric1 || this.state.repairs1 !== prevState.repairs1 || this.state.trashremoval1 !== prevState.trashremoval1 || this.state.janitorial1 !== prevState.janitorial1 || this.state.maintenance1 !== prevState.maintenance1 || this.state.others1 !== prevState.others1) {
                var taxes1 = isNaN(parseInt(this.state.taxes1, 10)) ? 0 : parseInt(this.state.taxes1, 10);
                var insurance1 = isNaN(parseInt(this.state.insurance1, 10)) ? 0 : parseInt(this.state.insurance1, 10);
                var electric1 = isNaN(parseInt(this.state.electric1, 10)) ? 0 : parseInt(this.state.electric1, 10);
                var repairs1 = isNaN(parseInt(this.state.repairs1, 10)) ? 0 : parseInt(this.state.repairs1, 10);
                var trashremoval1 = isNaN(parseInt(this.state.trashremoval1, 10)) ? 0 : parseInt(this.state.trashremoval1, 10);
                var janitorial1 = isNaN(parseInt(this.state.janitorial1, 10)) ? 0 : parseInt(this.state.janitorial1, 10);
                var maintenance1 = isNaN(parseInt(this.state.maintenance1, 10)) ? 0 : parseInt(this.state.maintenance1, 10);
                var others1 = isNaN(parseInt(this.state.others1, 10)) ? 0 : parseInt(this.state.others1, 10);
                this.setState({ totalReimbursement: taxes1 + insurance1 + electric1 + repairs1 + trashremoval1 + janitorial1 + maintenance1 + others1 });
            }

            //calculate total expenses information
            if (this.state.propertytaxes !== prevState.propertytaxes || this.state.insurance !== prevState.insurance || this.state.management !== prevState.management || this.state.maintenance !== prevState.maintenance || this.state.water !== prevState.water || this.state.repairs !== prevState.repairs || this.state.gas !== prevState.gas || this.state.janitoria !== prevState.janitoria || this.state.electric !== prevState.electric || this.state.trashremoval !== prevState.trashremoval || this.state.advertising !== prevState.advertising || this.state.others !== prevState.others || this.state.legalfees !== prevState.legalfees) {
                var propertytaxes = isNaN(parseInt(this.state.propertytaxes, 10)) ? 0 : parseInt(this.state.propertytaxes, 10);
                var insurance = isNaN(parseInt(this.state.insurance, 10)) ? 0 : parseInt(this.state.insurance, 10);
                var management = isNaN(parseInt(this.state.management, 10)) ? 0 : parseInt(this.state.management, 10);
                var maintenance = isNaN(parseInt(this.state.maintenance, 10)) ? 0 : parseInt(this.state.maintenance, 10);
                var water = isNaN(parseInt(this.state.water, 10)) ? 0 : parseInt(this.state.water, 10);
                var repairs = isNaN(parseInt(this.state.repairs, 10)) ? 0 : parseInt(this.state.repairs, 10);
                var gas = isNaN(parseInt(this.state.gas, 10)) ? 0 : parseInt(this.state.gas, 10);
                var janitorial = isNaN(parseInt(this.state.janitoria, 10)) ? 0 : parseInt(this.state.janitoria, 10);
                var electric = isNaN(parseInt(this.state.electric, 10)) ? 0 : parseInt(this.state.electric, 10);
                var trashremoval = isNaN(parseInt(this.state.trashremoval, 10)) ? 0 : parseInt(this.state.trashremoval, 10);
                var others = isNaN(parseInt(this.state.others, 10)) ? 0 : parseInt(this.state.others, 10);
                var advertising = isNaN(parseInt(this.state.advertising, 10)) ? 0 : parseInt(this.state.advertising, 10);
                var legalfees = isNaN(parseInt(this.state.legalfees, 10)) ? 0 : parseInt(this.state.legalfees, 10);
                this.setState({ totalExpenses: propertytaxes + insurance + management + maintenance + water + repairs + gas + janitorial + electric + trashremoval + others + advertising + legalfees });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _state = this.state,
                step = _state.step,
                income_info = _state.income_info,
                totalRent = _state.totalRent;

            var displayedForm = void 0;

            switch (step) {
                case 1:
                    displayedForm = React.createElement(PersonalDetails, {
                        increment: this.increment,
                        values: this.state
                    });
                    break;
                case 2:
                    displayedForm = React.createElement(IncomeInformation, {
                        incomeInfo: income_info,
                        increment: this.increment,
                        decrement: this.decrement,
                        addNewInfo: this.addNewInfo,
                        totalRent: totalRent
                    });
                    break;
                case 3:
                    displayedForm = React.createElement(ExpensesInformation, {
                        increment: this.increment,
                        decrement: this.decrement,
                        values: this.state
                    });
                    break;
                case 4:
                    displayedForm = React.createElement(TenantReimbursement, {
                        increment: this.increment,
                        decrement: this.decrement,
                        values: this.state
                    });
                    break;
                case 5:
                    displayedForm = React.createElement(ConfirmClientDetails, {
                        decrement: this.decrement,
                        postDataToServer: this.postDataToServer,
                        values: this.state
                    });
                    break;
            }
            return React.createElement(
                'form',
                { role: 'form', onSubmit: this.handleSubmit, onChange: this.handleChange },
                displayedForm
            );
        }
    }]);

    return App;
}(React.Component);

function PersonalDetails(props) {
    var increment = props.increment,
        values = props.values;

    return React.createElement(
        React.Fragment,
        null,
        React.createElement(
            'h1',
            null,
            'PERSONAL DETAILS'
        ),
        React.createElement(
            'div',
            { className: 'row' },
            React.createElement(
                'div',
                { className: 'col-sm-3' },
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { htmlFor: 'clientname' },
                        'Client Name',
                        React.createElement(
                            'span',
                            { className: 'required' },
                            '*'
                        ),
                        ':'
                    ),
                    React.createElement('input', { value: values.clientname, type: 'text', className: 'form-control', id: 'clientname', name: 'clientname' })
                )
            ),
            React.createElement(
                'div',
                { className: 'col-sm-3' },
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { htmlFor: 'glarea' },
                        'Gross Leasable Area',
                        React.createElement(
                            'span',
                            { className: 'required' },
                            '*'
                        ),
                        ':'
                    ),
                    React.createElement('input', { value: values.glarea, type: 'text', className: 'form-control', id: 'glarea', name: 'glarea' })
                )
            ),
            React.createElement(
                'div',
                { className: 'col-sm-3' },
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { htmlFor: 'vacantarea' },
                        'Vacant Area',
                        React.createElement(
                            'span',
                            { className: 'required' },
                            '*'
                        ),
                        ':'
                    ),
                    React.createElement('input', { value: values.vacantarea, type: 'text', className: 'form-control', id: 'vacantarea', name: 'vacantarea' })
                )
            ),
            React.createElement(
                'div',
                { className: 'col-sm-3' },
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { htmlFor: 'askingrent' },
                        'Asking Rent',
                        React.createElement(
                            'span',
                            { className: 'required' },
                            '*'
                        ),
                        ':'
                    ),
                    React.createElement('input', { value: values.askingrent, type: 'text', className: 'form-control', id: 'askingrent', name: 'askingrent' })
                )
            )
        ),
        React.createElement(
            'div',
            { className: 'row' },
            React.createElement(
                'div',
                { className: 'col-sm-3' },
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { htmlFor: 'propertyaddress' },
                        'Property Address',
                        React.createElement(
                            'span',
                            { className: 'required' },
                            '*'
                        ),
                        ':'
                    ),
                    React.createElement('input', { value: values.propertyaddress, type: 'text', className: 'form-control', id: 'propertyaddress', name: 'propertyaddress' })
                )
            ),
            React.createElement(
                'div',
                { className: 'col-sm-3' },
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { htmlFor: 'taxaccno' },
                        'Tax Acc No',
                        React.createElement(
                            'span',
                            { className: 'required' },
                            '*'
                        ),
                        ':'
                    ),
                    React.createElement('input', { value: values.taxaccno, type: 'text', className: 'form-control', id: 'taxaccno', name: 'taxaccno' })
                )
            ),
            React.createElement(
                'div',
                { className: 'col-sm-3' },
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { htmlFor: 'pgincome' },
                        'Potential Gross Income',
                        React.createElement(
                            'span',
                            { className: 'required' },
                            '*'
                        ),
                        ':'
                    ),
                    React.createElement('input', { value: values.pgincome, type: 'text', className: 'form-control', id: 'pgincome', name: 'pgincome' })
                )
            ),
            React.createElement(
                'div',
                { className: 'col-sm-3' },
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { htmlFor: 'agincome' },
                        'Actual Gross Income',
                        React.createElement(
                            'span',
                            { className: 'required' },
                            '*'
                        ),
                        ':'
                    ),
                    React.createElement('input', { value: values.agincome, type: 'text', className: 'form-control', id: 'agincome', name: 'agincome' })
                )
            )
        ),
        React.createElement(
            'button',
            {
                type: 'submit',
                className: 'btn btn-primary',
                onClick: increment
            },
            'Continue'
        )
    );
}

function IncomeInformation(props) {
    var incomeInfo = props.incomeInfo,
        increment = props.increment,
        decrement = props.decrement,
        addNewInfo = props.addNewInfo,
        totalRent = props.totalRent;

    return React.createElement(
        React.Fragment,
        null,
        React.createElement(
            'h1',
            null,
            'INCOME INFORMATION'
        ),
        React.createElement(
            'table',
            { className: 'table table-striped' },
            React.createElement(
                'thead',
                null,
                React.createElement(
                    'tr',
                    null,
                    React.createElement(
                        'th',
                        null,
                        'Suite#'
                    ),
                    React.createElement(
                        'th',
                        null,
                        'Tenant(s)'
                    ),
                    React.createElement(
                        'th',
                        null,
                        'SqFt.'
                    ),
                    React.createElement(
                        'th',
                        null,
                        'Rent'
                    ),
                    React.createElement(
                        'th',
                        null,
                        'Lease Term'
                    ),
                    React.createElement(
                        'th',
                        null,
                        'Year ',
                        React.createElement('br', null),
                        'Lease Started'
                    )
                )
            ),
            React.createElement(
                'tbody',
                null,
                incomeInfo.map(function (val, idx) {
                    return React.createElement(SingleIncomeInfo, { key: idx, idx: idx, val: val });
                }),
                React.createElement(
                    'tr',
                    null,
                    React.createElement(
                        'td',
                        { colSpan: '3' },
                        'Total Rent'
                    ),
                    React.createElement(
                        'td',
                        null,
                        React.createElement(
                            'h4',
                            null,
                            'USD ',
                            totalRent
                        )
                    ),
                    React.createElement(
                        'td',
                        null,
                        '\xA0'
                    ),
                    React.createElement(
                        'td',
                        null,
                        '\xA0'
                    )
                )
            )
        ),
        React.createElement(
            'button',
            {
                type: 'submit',
                className: 'btn btn-success',
                onClick: addNewInfo
            },
            'Add More Income Information'
        ),
        React.createElement(
            'button',
            {
                type: 'submit',
                className: 'btn btn-primary',
                onClick: increment
            },
            'Continue'
        ),
        React.createElement(
            'button',
            {
                type: 'submit',
                className: 'btn btn-default',
                onClick: decrement
            },
            'Back'
        )
    );
}

function SingleIncomeInfo(props) {
    var idx = props.idx,
        val = props.val;

    var suite = 'suite-' + idx,
        tenant = 'tenant-' + idx,
        sqft = 'sqft-' + idx,
        rent = 'rent-' + idx,
        lease = 'lease-' + idx,
        year = 'year-' + idx;
    return React.createElement(
        'tr',
        null,
        React.createElement(
            'td',
            null,
            React.createElement(
                'div',
                { className: 'form-group' },
                React.createElement('input', { value: val.suite, type: 'text', className: 'form-control', name: suite, 'data-id': idx, 'data-name': 'suite' })
            )
        ),
        React.createElement(
            'td',
            null,
            React.createElement(
                'div',
                { className: 'form-group' },
                React.createElement('input', { value: val.tenant, type: 'text', className: 'form-control', name: tenant, 'data-id': idx, 'data-name': 'tenant' })
            )
        ),
        React.createElement(
            'td',
            null,
            React.createElement(
                'div',
                { className: 'form-group' },
                React.createElement('input', { value: val.sqft, type: 'text', className: 'form-control', name: sqft, 'data-id': idx, 'data-name': 'sqft' })
            )
        ),
        React.createElement(
            'td',
            null,
            React.createElement(
                'div',
                { className: 'form-group' },
                React.createElement('input', { value: val.rent, type: 'text', className: 'form-control', name: rent, 'data-id': idx, 'data-name': 'rent' })
            )
        ),
        React.createElement(
            'td',
            null,
            React.createElement(
                'div',
                { className: 'form-group' },
                React.createElement('input', { value: val.lease, type: 'text', className: 'form-control', name: lease, 'data-id': idx, 'data-name': 'lease' })
            )
        ),
        React.createElement(
            'td',
            null,
            React.createElement(
                'div',
                { className: 'form-group' },
                React.createElement('input', { value: val.year, type: 'text', className: 'form-control', name: year, 'data-id': idx, 'data-name': 'year' })
            )
        )
    );
}

function ExpensesInformation(props) {
    var increment = props.increment,
        decrement = props.decrement,
        values = props.values;

    return React.createElement(
        React.Fragment,
        null,
        React.createElement(
            'h1',
            null,
            'EXPENSES INFORMATION'
        ),
        React.createElement(
            'div',
            { className: 'row' },
            React.createElement(
                'div',
                { className: 'col-sm-6' },
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { htmlFor: 'propertytaxes' },
                        'Property Taxes',
                        React.createElement(
                            'span',
                            { className: 'required' },
                            '*'
                        ),
                        ':'
                    ),
                    React.createElement('input', { value: values.propertytaxes, type: 'text', className: 'form-control', id: 'propertytaxes', name: 'propertytaxes' })
                )
            ),
            React.createElement(
                'div',
                { className: 'col-sm-6' },
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { htmlFor: 'insurance' },
                        'Insurance',
                        React.createElement(
                            'span',
                            { className: 'required' },
                            '*'
                        ),
                        ':'
                    ),
                    React.createElement('input', { value: values.insurance, type: 'text', className: 'form-control', id: 'insurance', name: 'insurance' })
                )
            )
        ),
        React.createElement(
            'div',
            { className: 'row' },
            React.createElement(
                'div',
                { className: 'col-sm-6' },
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { htmlFor: 'management' },
                        'Management',
                        React.createElement(
                            'span',
                            { className: 'required' },
                            '*'
                        ),
                        ':'
                    ),
                    React.createElement('input', { value: values.management, type: 'text', className: 'form-control', id: 'management', name: 'management' })
                )
            ),
            React.createElement(
                'div',
                { className: 'col-sm-6' },
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { htmlFor: 'maintenance' },
                        'Maintenance',
                        React.createElement(
                            'span',
                            { className: 'required' },
                            '*'
                        ),
                        ':'
                    ),
                    React.createElement('input', { value: values.maintenance, type: 'text', className: 'form-control', id: 'maintenance', name: 'maintenance' })
                )
            )
        ),
        React.createElement(
            'div',
            { className: 'row' },
            React.createElement(
                'div',
                { className: 'col-sm-6' },
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { htmlFor: 'water' },
                        'Water',
                        React.createElement(
                            'span',
                            { className: 'required' },
                            '*'
                        ),
                        ':'
                    ),
                    React.createElement('input', { value: values.water, type: 'text', className: 'form-control', id: 'water', name: 'water' })
                )
            ),
            React.createElement(
                'div',
                { className: 'col-sm-6' },
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { htmlFor: 'repairs' },
                        'Repairs',
                        React.createElement(
                            'span',
                            { className: 'required' },
                            '*'
                        ),
                        ':'
                    ),
                    React.createElement('input', { value: values.repairs, type: 'text', className: 'form-control', id: 'repairs', name: 'repairs' })
                )
            )
        ),
        React.createElement(
            'div',
            { className: 'row' },
            React.createElement(
                'div',
                { className: 'col-sm-6' },
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { htmlFor: 'gas' },
                        'Gas',
                        React.createElement(
                            'span',
                            { className: 'required' },
                            '*'
                        ),
                        ':'
                    ),
                    React.createElement('input', { value: values.gas, type: 'text', className: 'form-control', id: 'gas', name: 'gas' })
                )
            ),
            React.createElement(
                'div',
                { className: 'col-sm-6' },
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { htmlFor: 'janitoria' },
                        'Janitorial',
                        React.createElement(
                            'span',
                            { className: 'required' },
                            '*'
                        ),
                        ':'
                    ),
                    React.createElement('input', { value: values.janitoria, type: 'text', className: 'form-control', id: 'janitoria', name: 'janitoria' })
                )
            )
        ),
        React.createElement(
            'div',
            { className: 'row' },
            React.createElement(
                'div',
                { className: 'col-sm-6' },
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { htmlFor: 'electric' },
                        'Electric',
                        React.createElement(
                            'span',
                            { className: 'required' },
                            '*'
                        ),
                        ':'
                    ),
                    React.createElement('input', { value: values.electric, type: 'text', className: 'form-control', id: 'electric', name: 'electric' })
                )
            ),
            React.createElement(
                'div',
                { className: 'col-sm-6' },
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { htmlFor: 'trashremoval' },
                        'Trash Removal',
                        React.createElement(
                            'span',
                            { className: 'required' },
                            '*'
                        ),
                        ':'
                    ),
                    React.createElement('input', { value: values.trashremoval, type: 'text', className: 'form-control', id: 'trashremoval', name: 'trashremoval' })
                )
            )
        ),
        React.createElement(
            'div',
            { className: 'row' },
            React.createElement(
                'div',
                { className: 'col-sm-6' },
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { htmlFor: 'advertising' },
                        'Advertising',
                        React.createElement(
                            'span',
                            { className: 'required' },
                            '*'
                        ),
                        ':'
                    ),
                    React.createElement('input', { value: values.advertising, type: 'text', className: 'form-control', id: 'advertising', name: 'advertising' })
                )
            ),
            React.createElement(
                'div',
                { className: 'col-sm-6' },
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { htmlFor: 'legalfees' },
                        'Legal Fees',
                        React.createElement(
                            'span',
                            { className: 'required' },
                            '*'
                        ),
                        ':'
                    ),
                    React.createElement('input', { value: values.legalfees, type: 'text', className: 'form-control', id: 'legalfees', name: 'legalfees' })
                )
            )
        ),
        React.createElement(
            'div',
            { className: 'row' },
            React.createElement(
                'div',
                { className: 'col-sm-6' },
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { htmlFor: 'others' },
                        'Others',
                        React.createElement(
                            'span',
                            { className: 'required' },
                            '*'
                        ),
                        ':'
                    ),
                    React.createElement('input', { value: values.others, type: 'text', className: 'form-control', id: 'others', name: 'others' })
                )
            )
        ),
        React.createElement(
            'div',
            { className: 'row' },
            React.createElement(
                'div',
                { className: 'col-sm-6' },
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'h4',
                        null,
                        'Total Fees: USD ',
                        values.totalExpenses
                    )
                )
            )
        ),
        React.createElement(
            'button',
            {
                type: 'submit',
                className: 'btn btn-primary',
                onClick: increment
            },
            'Continue'
        ),
        React.createElement(
            'button',
            {
                type: 'submit',
                className: 'btn btn-default',
                onClick: decrement
            },
            'Back'
        )
    );
}

function TenantReimbursement(props) {
    var values = props.values,
        increment = props.increment,
        decrement = props.decrement;

    return React.createElement(
        React.Fragment,
        null,
        React.createElement(
            'h3',
            null,
            'TENANT REIMBURSEMENT ',
            React.createElement(
                'small',
                null,
                'If applies'
            )
        ),
        React.createElement(
            'div',
            { className: 'row' },
            React.createElement(
                'div',
                { className: 'col-sm-3' },
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { htmlFor: 'taxes1' },
                        'Taxes',
                        React.createElement(
                            'span',
                            { className: 'required' },
                            '*'
                        ),
                        ':'
                    ),
                    React.createElement('input', { value: values.taxes1, type: 'text', className: 'form-control', id: 'taxes1', name: 'taxes1' })
                )
            ),
            React.createElement(
                'div',
                { className: 'col-sm-3' },
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { htmlFor: 'insurance1' },
                        'Insurance',
                        React.createElement(
                            'span',
                            { className: 'required' },
                            '*'
                        ),
                        ':'
                    ),
                    React.createElement('input', { value: values.insurance1, type: 'text', className: 'form-control', id: 'insurance1', name: 'insurance1' })
                )
            ),
            React.createElement(
                'div',
                { className: 'col-sm-3' },
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { htmlFor: 'electric1' },
                        'Electric',
                        React.createElement(
                            'span',
                            { className: 'required' },
                            '*'
                        ),
                        ':'
                    ),
                    React.createElement('input', { value: values.electric1, type: 'text', className: 'form-control', id: 'electric1', name: 'electric1' })
                )
            ),
            React.createElement(
                'div',
                { className: 'col-sm-3' },
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { htmlFor: 'repairs1' },
                        'Repairs',
                        React.createElement(
                            'span',
                            { className: 'required' },
                            '*'
                        ),
                        ':'
                    ),
                    React.createElement('input', { value: values.repairs1, type: 'text', className: 'form-control', id: 'repairs1', name: 'repairs1' })
                )
            )
        ),
        React.createElement(
            'div',
            { className: 'row' },
            React.createElement(
                'div',
                { className: 'col-sm-3' },
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { htmlFor: 'trashremoval1' },
                        'Trash Removal',
                        React.createElement(
                            'span',
                            { className: 'required' },
                            '*'
                        ),
                        ':'
                    ),
                    React.createElement('input', { value: values.trashremoval1, type: 'text', className: 'form-control', id: 'trashremoval1', name: 'trashremoval1' })
                )
            ),
            React.createElement(
                'div',
                { className: 'col-sm-3' },
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { htmlFor: 'janitorial1' },
                        'Janitorial',
                        React.createElement(
                            'span',
                            { className: 'required' },
                            '*'
                        ),
                        ':'
                    ),
                    React.createElement('input', { value: values.janitorial1, type: 'text', className: 'form-control', id: 'janitorial1', name: 'janitorial1' })
                )
            ),
            React.createElement(
                'div',
                { className: 'col-sm-3' },
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { htmlFor: 'maintenance1' },
                        'Maintenance',
                        React.createElement(
                            'span',
                            { className: 'required' },
                            '*'
                        ),
                        ':'
                    ),
                    React.createElement('input', { value: values.maintenance1, type: 'text', className: 'form-control', id: 'maintenance1', name: 'maintenance1' })
                )
            ),
            React.createElement(
                'div',
                { className: 'col-sm-3' },
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { htmlFor: 'others1' },
                        'Others',
                        React.createElement(
                            'span',
                            { className: 'required' },
                            '*'
                        ),
                        ':'
                    ),
                    React.createElement('input', { value: values.others1, type: 'text', className: 'form-control', id: 'others1', name: 'others1' })
                )
            )
        ),
        React.createElement(
            'div',
            { className: 'row' },
            React.createElement(
                'div',
                { className: 'col-sm-6' },
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'h4',
                        null,
                        'Total Fees: USD ',
                        values.totalReimbursement
                    )
                )
            )
        ),
        React.createElement(
            'button',
            {
                type: 'submit',
                className: 'btn btn-primary',
                onClick: increment
            },
            'Affirm Correct Details'
        ),
        React.createElement(
            'button',
            {
                type: 'submit',
                className: 'btn btn-default',
                onClick: decrement
            },
            'Back'
        )
    );
}

function ConfirmClientDetails(props) {
    var decrement = props.decrement,
        values = props.values,
        postDataToServer = props.postDataToServer;

    var totalRent = 0;
    for (var index = 0; index < values.income_info.length; index++) {
        var singleRent = values.income_info[index]['rent'];
        var subRent = isNaN(parseInt(singleRent, 10)) ? 0 : parseInt(singleRent, 10);
        totalRent = totalRent + subRent;
    }
    console.log(totalRent);
    return React.createElement(
        React.Fragment,
        null,
        React.createElement(
            'div',
            { className: 'row' },
            React.createElement(
                'div',
                { className: 'col-sm-12' },
                React.createElement(
                    'h2',
                    null,
                    'CLIENT DETAILS'
                ),
                React.createElement(
                    'div',
                    { className: 'table-responsive' },
                    React.createElement(
                        'table',
                        { className: 'table table-striped confirm-dtails' },
                        React.createElement(
                            'tbody',
                            null,
                            React.createElement(
                                'tr',
                                null,
                                React.createElement(
                                    'td',
                                    null,
                                    React.createElement(
                                        'h3',
                                        null,
                                        values.clientname
                                    ),
                                    React.createElement(
                                        'p',
                                        null,
                                        'Client Name'
                                    )
                                ),
                                React.createElement(
                                    'td',
                                    null,
                                    React.createElement(
                                        'h3',
                                        null,
                                        values.glarea
                                    ),
                                    React.createElement(
                                        'p',
                                        null,
                                        'Gross Leaseable Area'
                                    )
                                ),
                                React.createElement(
                                    'td',
                                    null,
                                    React.createElement(
                                        'h3',
                                        null,
                                        values.vacantarea
                                    ),
                                    React.createElement(
                                        'p',
                                        null,
                                        'Vacant Area'
                                    )
                                ),
                                React.createElement(
                                    'td',
                                    null,
                                    React.createElement(
                                        'h3',
                                        null,
                                        values.askingrent
                                    ),
                                    React.createElement(
                                        'p',
                                        null,
                                        'Asking Rent'
                                    )
                                )
                            ),
                            React.createElement(
                                'tr',
                                null,
                                React.createElement(
                                    'td',
                                    null,
                                    React.createElement(
                                        'h3',
                                        null,
                                        values.propertyaddress
                                    ),
                                    React.createElement(
                                        'p',
                                        null,
                                        'Property Address'
                                    )
                                ),
                                React.createElement(
                                    'td',
                                    null,
                                    React.createElement(
                                        'h3',
                                        null,
                                        values.taxaccno
                                    ),
                                    React.createElement(
                                        'p',
                                        null,
                                        'Tax Acc. No'
                                    )
                                ),
                                React.createElement(
                                    'td',
                                    null,
                                    React.createElement(
                                        'h3',
                                        null,
                                        values.pgincome
                                    ),
                                    React.createElement(
                                        'p',
                                        null,
                                        'Potential Gross Income'
                                    )
                                ),
                                React.createElement(
                                    'td',
                                    null,
                                    React.createElement(
                                        'h3',
                                        null,
                                        values.agincome
                                    ),
                                    React.createElement(
                                        'p',
                                        null,
                                        'Actual Gross Income'
                                    )
                                )
                            )
                        )
                    )
                )
            )
        ),
        React.createElement(
            'div',
            { className: 'row' },
            React.createElement(
                'div',
                { className: 'col-sm-12' },
                React.createElement(
                    'h2',
                    null,
                    'INCOME INFORMATION'
                ),
                React.createElement(
                    'div',
                    { className: 'table-responsive' },
                    React.createElement(
                        'table',
                        { className: 'table table-striped' },
                        React.createElement(
                            'thead',
                            null,
                            React.createElement(
                                'tr',
                                null,
                                React.createElement(
                                    'th',
                                    null,
                                    'Suite#'
                                ),
                                React.createElement(
                                    'th',
                                    null,
                                    'Tenant(s)'
                                ),
                                React.createElement(
                                    'th',
                                    null,
                                    'SqFt.'
                                ),
                                React.createElement(
                                    'th',
                                    null,
                                    'Rent (USD)'
                                ),
                                React.createElement(
                                    'th',
                                    null,
                                    'Lease Term(Yrs)'
                                ),
                                React.createElement(
                                    'th',
                                    null,
                                    'Year ',
                                    React.createElement('br', null),
                                    'Lease Started'
                                )
                            )
                        ),
                        React.createElement(
                            'tbody',
                            null,
                            values.income_info.map(function (info, id) {
                                return React.createElement(
                                    'tr',
                                    { key: id },
                                    React.createElement(
                                        'td',
                                        null,
                                        React.createElement(
                                            'h3',
                                            null,
                                            info.suite
                                        )
                                    ),
                                    React.createElement(
                                        'td',
                                        null,
                                        React.createElement(
                                            'h3',
                                            null,
                                            info.tenant
                                        )
                                    ),
                                    React.createElement(
                                        'td',
                                        null,
                                        React.createElement(
                                            'h3',
                                            null,
                                            info.sqft
                                        )
                                    ),
                                    React.createElement(
                                        'td',
                                        null,
                                        React.createElement(
                                            'h3',
                                            null,
                                            info.rent
                                        )
                                    ),
                                    React.createElement(
                                        'td',
                                        null,
                                        React.createElement(
                                            'h3',
                                            null,
                                            info.lease
                                        )
                                    ),
                                    React.createElement(
                                        'td',
                                        null,
                                        React.createElement(
                                            'h3',
                                            null,
                                            info.year
                                        )
                                    )
                                );
                            }),
                            React.createElement(
                                'tr',
                                null,
                                React.createElement(
                                    'td',
                                    { colSpan: '3' },
                                    React.createElement(
                                        'h3',
                                        null,
                                        'Total Rent'
                                    )
                                ),
                                React.createElement(
                                    'td',
                                    null,
                                    React.createElement(
                                        'h3',
                                        null,
                                        'USD ',
                                        totalRent
                                    )
                                ),
                                React.createElement(
                                    'td',
                                    null,
                                    '\xA0'
                                ),
                                React.createElement(
                                    'td',
                                    null,
                                    '\xA0'
                                )
                            )
                        )
                    )
                )
            )
        ),
        React.createElement(
            'div',
            { className: 'row' },
            React.createElement(
                'div',
                { className: 'col-sm-12' },
                React.createElement(
                    'h2',
                    null,
                    'EXPENSES INFORMATION (USD)'
                ),
                React.createElement(
                    'div',
                    { className: 'table-responsive' },
                    React.createElement(
                        'table',
                        { className: 'table table-striped' },
                        React.createElement(
                            'tbody',
                            null,
                            React.createElement(
                                'tr',
                                null,
                                React.createElement(
                                    'td',
                                    null,
                                    React.createElement(
                                        'h3',
                                        null,
                                        values.propertytaxes
                                    ),
                                    React.createElement(
                                        'p',
                                        null,
                                        'Property Taxes'
                                    )
                                ),
                                React.createElement(
                                    'td',
                                    null,
                                    React.createElement(
                                        'h3',
                                        null,
                                        values.insurance
                                    ),
                                    React.createElement(
                                        'p',
                                        null,
                                        'Insurance'
                                    )
                                ),
                                React.createElement(
                                    'td',
                                    null,
                                    React.createElement(
                                        'h3',
                                        null,
                                        values.management
                                    ),
                                    React.createElement(
                                        'p',
                                        null,
                                        'Management'
                                    )
                                )
                            ),
                            React.createElement(
                                'tr',
                                null,
                                React.createElement(
                                    'td',
                                    null,
                                    React.createElement(
                                        'h3',
                                        null,
                                        values.maintenance
                                    ),
                                    React.createElement(
                                        'p',
                                        null,
                                        'Maintenance'
                                    )
                                ),
                                React.createElement(
                                    'td',
                                    null,
                                    React.createElement(
                                        'h3',
                                        null,
                                        values.water
                                    ),
                                    React.createElement(
                                        'p',
                                        null,
                                        'Water'
                                    )
                                ),
                                React.createElement(
                                    'td',
                                    null,
                                    React.createElement(
                                        'h3',
                                        null,
                                        values.repairs
                                    ),
                                    React.createElement(
                                        'p',
                                        null,
                                        'Repairs'
                                    )
                                )
                            ),
                            React.createElement(
                                'tr',
                                null,
                                React.createElement(
                                    'td',
                                    null,
                                    React.createElement(
                                        'h3',
                                        null,
                                        values.gas
                                    ),
                                    React.createElement(
                                        'p',
                                        null,
                                        'Gas'
                                    )
                                ),
                                React.createElement(
                                    'td',
                                    null,
                                    React.createElement(
                                        'h3',
                                        null,
                                        values.janitoria
                                    ),
                                    React.createElement(
                                        'p',
                                        null,
                                        'Janitorial'
                                    )
                                ),
                                React.createElement(
                                    'td',
                                    null,
                                    React.createElement(
                                        'h3',
                                        null,
                                        values.electric
                                    ),
                                    React.createElement(
                                        'p',
                                        null,
                                        'Electric'
                                    )
                                )
                            ),
                            React.createElement(
                                'tr',
                                null,
                                React.createElement(
                                    'td',
                                    null,
                                    React.createElement(
                                        'h3',
                                        null,
                                        values.trashremoval
                                    ),
                                    React.createElement(
                                        'p',
                                        null,
                                        'Trash Removal'
                                    )
                                ),
                                React.createElement(
                                    'td',
                                    null,
                                    React.createElement(
                                        'h3',
                                        null,
                                        values.advertising
                                    ),
                                    React.createElement(
                                        'p',
                                        null,
                                        'Advertising'
                                    )
                                ),
                                React.createElement(
                                    'td',
                                    null,
                                    React.createElement(
                                        'h3',
                                        null,
                                        values.legalfees
                                    ),
                                    React.createElement(
                                        'p',
                                        null,
                                        'Legal Fees'
                                    )
                                )
                            ),
                            React.createElement(
                                'tr',
                                null,
                                React.createElement(
                                    'td',
                                    null,
                                    React.createElement(
                                        'h3',
                                        null,
                                        values.others
                                    ),
                                    React.createElement(
                                        'p',
                                        null,
                                        'Others'
                                    )
                                ),
                                React.createElement(
                                    'td',
                                    null,
                                    React.createElement(
                                        'h3',
                                        null,
                                        '\xA0'
                                    ),
                                    React.createElement(
                                        'p',
                                        null,
                                        '\xA0'
                                    )
                                ),
                                React.createElement(
                                    'td',
                                    null,
                                    React.createElement(
                                        'h3',
                                        null,
                                        '\xA0'
                                    ),
                                    React.createElement(
                                        'p',
                                        null,
                                        '\xA0'
                                    )
                                )
                            ),
                            React.createElement(
                                'tr',
                                null,
                                React.createElement(
                                    'td',
                                    null,
                                    React.createElement(
                                        'h3',
                                        null,
                                        'Total'
                                    )
                                ),
                                React.createElement(
                                    'td',
                                    { colspan: '2' },
                                    React.createElement(
                                        'h3',
                                        null,
                                        'USD ',
                                        values.totalExpenses
                                    )
                                )
                            )
                        )
                    )
                )
            )
        ),
        React.createElement(
            'div',
            { className: 'row' },
            React.createElement(
                'div',
                { className: 'col-sm-12' },
                React.createElement(
                    'h2',
                    null,
                    'TENANT REIMBURSEMENT (USD)'
                ),
                React.createElement(
                    'div',
                    { className: 'table-responsive' },
                    React.createElement(
                        'table',
                        { className: 'table table-striped' },
                        React.createElement(
                            'tbody',
                            null,
                            React.createElement(
                                'tr',
                                null,
                                React.createElement(
                                    'td',
                                    null,
                                    React.createElement(
                                        'h3',
                                        null,
                                        values.taxes1
                                    ),
                                    React.createElement(
                                        'p',
                                        null,
                                        'Taxes'
                                    )
                                )
                            ),
                            React.createElement(
                                'tr',
                                null,
                                React.createElement(
                                    'td',
                                    null,
                                    React.createElement(
                                        'h3',
                                        null,
                                        values.insurance1
                                    ),
                                    React.createElement(
                                        'p',
                                        null,
                                        'Insurance'
                                    )
                                )
                            ),
                            React.createElement(
                                'tr',
                                null,
                                React.createElement(
                                    'td',
                                    null,
                                    React.createElement(
                                        'h3',
                                        null,
                                        values.electric1
                                    ),
                                    React.createElement(
                                        'p',
                                        null,
                                        'Electric'
                                    )
                                )
                            ),
                            React.createElement(
                                'tr',
                                null,
                                React.createElement(
                                    'td',
                                    null,
                                    React.createElement(
                                        'h3',
                                        null,
                                        values.repairs1
                                    ),
                                    React.createElement(
                                        'p',
                                        null,
                                        'Repairs'
                                    )
                                )
                            ),
                            React.createElement(
                                'tr',
                                null,
                                React.createElement(
                                    'td',
                                    null,
                                    React.createElement(
                                        'h3',
                                        null,
                                        values.trashremoval1
                                    ),
                                    React.createElement(
                                        'p',
                                        null,
                                        'Trash Removal'
                                    )
                                )
                            ),
                            React.createElement(
                                'tr',
                                null,
                                React.createElement(
                                    'td',
                                    null,
                                    React.createElement(
                                        'h3',
                                        null,
                                        values.janitorial1
                                    ),
                                    React.createElement(
                                        'p',
                                        null,
                                        'Janitorial'
                                    )
                                )
                            ),
                            React.createElement(
                                'tr',
                                null,
                                React.createElement(
                                    'td',
                                    null,
                                    React.createElement(
                                        'h3',
                                        null,
                                        values.maintenance1
                                    ),
                                    React.createElement(
                                        'p',
                                        null,
                                        'Maintenance'
                                    )
                                )
                            ),
                            React.createElement(
                                'tr',
                                null,
                                React.createElement(
                                    'td',
                                    null,
                                    React.createElement(
                                        'h3',
                                        null,
                                        values.others1
                                    ),
                                    React.createElement(
                                        'p',
                                        null,
                                        'Others'
                                    )
                                )
                            ),
                            React.createElement(
                                'tr',
                                null,
                                React.createElement(
                                    'td',
                                    null,
                                    React.createElement(
                                        'h3',
                                        null,
                                        'Total: USD ',
                                        values.totalReimbursement
                                    )
                                )
                            )
                        )
                    )
                )
            )
        ),
        React.createElement(
            'div',
            { className: 'row' },
            React.createElement(
                'div',
                { className: 'col-sm-12' },
                React.createElement(
                    'button',
                    {
                        className: 'btn btn-success',
                        onClick: postDataToServer
                    },
                    values.inProgress ? 'Form Is Now Submitted...' : 'Submit Your Details'
                ),
                React.createElement(
                    'button',
                    {
                        className: 'btn btn-default',
                        onClick: decrement
                    },
                    'Back & Edit Details'
                )
            )
        ),
        React.createElement(
            'div',
            { className: 'row' },
            React.createElement(
                'div',
                { className: 'col-sm-12' },
                values.mailSent && React.createElement(
                    'div',
                    { className: 'alert alert-success' },
                    React.createElement(
                        'strong',
                        null,
                        'Success!'
                    ),
                    ' Thank You For Filling And Submitting Your Form'
                ),
                values.error && React.createElement(
                    'div',
                    { 'class': 'alert alert-danger' },
                    React.createElement(
                        'strong',
                        null,
                        'Error!'
                    ),
                    ' Sorry, We Are Experiencing An Error. Please Try Again Later.'
                )
            )
        )
    );
}

var domContainer = document.querySelector('#mycontainer');
ReactDOM.render(React.createElement(App, null), domContainer);