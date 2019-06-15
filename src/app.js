'use strict';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
            income_info: [
                {
                    suite: '', 
                    tenant: '', 
                    sqft: '', 
                    rent: '', 
                    lease: '', 
                    year: ''
                }
            ],
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
    }


    componentDidUpdate(prevProps, prevState) {
        //console.log(this.initTotalRent);
        //calculate total reimbursement
        if (this.state.taxes1 !== prevState.taxes1 || this.state.insurance1 !== prevState.insurance1 || 
            this.state.electric1 !== prevState.electric1 || this.state.repairs1 !== prevState.repairs1 || 
            this.state.trashremoval1 !== prevState.trashremoval1 || this.state.janitorial1 !== prevState.janitorial1 || 
            this.state.maintenance1 !== prevState.maintenance1 || this.state.others1 !== prevState.others1) {
                const taxes1 = isNaN(parseInt(this.state.taxes1, 10)) ? 0 : parseInt(this.state.taxes1, 10);
                const insurance1 = isNaN(parseInt(this.state.insurance1, 10)) ? 0 : parseInt(this.state.insurance1, 10);
                const electric1 = isNaN(parseInt(this.state.electric1, 10)) ? 0 : parseInt(this.state.electric1, 10);
                const repairs1 = isNaN(parseInt(this.state.repairs1, 10)) ? 0 : parseInt(this.state.repairs1, 10);
                const trashremoval1 = isNaN(parseInt(this.state.trashremoval1, 10)) ? 0 : parseInt(this.state.trashremoval1, 10);
                const janitorial1 = isNaN(parseInt(this.state.janitorial1, 10)) ? 0 : parseInt(this.state.janitorial1, 10);
                const maintenance1 = isNaN(parseInt(this.state.maintenance1, 10)) ? 0 : parseInt(this.state.maintenance1, 10);
                const others1 = isNaN(parseInt(this.state.others1, 10)) ? 0 : parseInt(this.state.others1, 10);
                this.setState({ totalReimbursement : taxes1 + insurance1 + electric1 + repairs1 + trashremoval1 + janitorial1 + maintenance1 + others1 });
        }

        //calculate total expenses information
        if (this.state.propertytaxes !== prevState.propertytaxes ||
            this.state.insurance !== prevState.insurance || 
            this.state.management !== prevState.management || 
            this.state.maintenance !== prevState.maintenance || 
            this.state.water !== prevState.water || 
            this.state.repairs !== prevState.repairs || 
            this.state.gas !== prevState.gas || 
            this.state.janitoria !== prevState.janitoria || 
            this.state.electric !== prevState.electric || 
            this.state.trashremoval !== prevState.trashremoval || 
            this.state.advertising !== prevState.advertising || 
            this.state.others !== prevState.others || 
            this.state.legalfees !== prevState.legalfees) {
                const propertytaxes = isNaN(parseInt(this.state.propertytaxes, 10)) ? 0 : parseInt(this.state.propertytaxes, 10);
                const insurance = isNaN(parseInt(this.state.insurance, 10)) ? 0 : parseInt(this.state.insurance, 10);
                const management = isNaN(parseInt(this.state.management, 10)) ? 0 : parseInt(this.state.management, 10);
                const maintenance = isNaN(parseInt(this.state.maintenance, 10)) ? 0 : parseInt(this.state.maintenance, 10);
                const water = isNaN(parseInt(this.state.water, 10)) ? 0 : parseInt(this.state.water, 10);
                const repairs = isNaN(parseInt(this.state.repairs, 10)) ? 0 : parseInt(this.state.repairs, 10);
                const gas = isNaN(parseInt(this.state.gas, 10)) ? 0 : parseInt(this.state.gas, 10);
                const janitorial = isNaN(parseInt(this.state.janitoria, 10)) ? 0 : parseInt(this.state.janitoria, 10);
                const electric = isNaN(parseInt(this.state.electric, 10)) ? 0 : parseInt(this.state.electric, 10);
                const trashremoval = isNaN(parseInt(this.state.trashremoval, 10)) ? 0 : parseInt(this.state.trashremoval, 10);
                const others = isNaN(parseInt(this.state.others, 10)) ? 0 : parseInt(this.state.others, 10);
                const advertising = isNaN(parseInt(this.state.advertising, 10)) ? 0 : parseInt(this.state.advertising, 10);
                const legalfees = isNaN(parseInt(this.state.legalfees, 10)) ? 0 : parseInt(this.state.legalfees, 10);
                this.setState({ totalExpenses : propertytaxes + insurance + management + maintenance + water + repairs + gas + janitorial + electric + trashremoval + others + advertising + legalfees });
                
        }
        
    }

    handleChange = (e) => {
        if (["suite", "tenant", "sqft", "rent", "lease", "year"].includes(e.target.dataset.name) ) {
            let incomeInfo = [...this.state.income_info]
            incomeInfo[e.target.dataset.id][e.target.dataset.name] = e.target.value
            this.setState({ income_Info: incomeInfo }, () => {})

        } else {
            this.setState({ [e.target.name]: e.target.value })
        }
    }


    addNewInfo = (e) => {
        this.setState((prevState) => ({
            income_info: [...prevState.income_info, {
                    suite: '', 
                    tenant:'', 
                    sqft: '', 
                    rent: '', 
                    lease: '', 
                    year: ''
                }],
        }));
    }


    increment = (e) => {
        this.setState(prev => ({
            step : prev.step + 1
        }))
    }


    decrement = (e) => {
        this.setState(prev => ({
            step : prev.step - 1
        }))
    }

    handleSubmit = (e) => { e.preventDefault() }


    postDataToServer = (e) => {
        //call your api script here
        e.preventDefault();
        this.setState({ inProgress: true });
        axios({
            method: "post",
            url: this.state.appurl,
            headers: { "content-type": "application/json" },
            data: this.state
        })
        .then(result => {
            if (result.data.sent) {
                this.setState({
                    mailSent: result.data.sent
                });
                this.setState({ error: false, inProgress: false });
            } else {
                this.setState({ error: true, inProgress: false });
            }
        })
        .catch(error => this.setState({ error: error.message, inProgress: false }));
    }


    render() {
        const { step, income_info, totalRent } = this.state;
        let displayedForm;

        switch (step) {
            case 1:
                displayedForm = <PersonalDetails 
                                    increment={this.increment}
                                    values={this.state}
                                />;
                break;
            case 2:
                displayedForm = <IncomeInformation 
                                    incomeInfo={income_info} 
                                    increment={this.increment}
                                    decrement={this.decrement}
                                    addNewInfo={this.addNewInfo}
                                    totalRent={totalRent}
                                />;
                break;
            case 3:
                displayedForm = <ExpensesInformation 
                                    increment={this.increment}
                                    decrement={this.decrement}
                                    values={this.state}
                                />;
                break;
            case 4:
                displayedForm = <TenantReimbursement 
                                    increment={this.increment}
                                    decrement={this.decrement}
                                    values={this.state}
                                />;
                break;
            case 5:
                displayedForm = <ConfirmClientDetails
                                    decrement={this.decrement}
                                    postDataToServer={this.postDataToServer}
                                    values={this.state}
                                />;
                break;
        }
        return (
            <form role="form" onSubmit={this.handleSubmit} onChange={this.handleChange}>
                { displayedForm }
            </form>
        );
    }
}

function PersonalDetails(props) {
    const {increment, values} = props;
    return (
        <React.Fragment>
            <h1>PERSONAL DETAILS</h1>
            <div className="row">
                <div className="col-sm-3">
                    <div className="form-group">
                        <label htmlFor="clientname">Client Name<span className="required">*</span>:</label>
                        <input value={values.clientname} type="text" className="form-control" id="clientname" name="clientname" />
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="form-group">
                        <label htmlFor="glarea">Gross Leasable Area<span className="required">*</span>:</label>
                        <input value={values.glarea} type="text" className="form-control" id="glarea" name="glarea" />
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="form-group">
                        <label htmlFor="vacantarea">Vacant Area<span className="required">*</span>:</label>
                        <input value={values.vacantarea} type="text" className="form-control" id="vacantarea" name="vacantarea" />
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="form-group">
                        <label htmlFor="askingrent">Asking Rent<span className="required">*</span>:</label>
                        <input value={values.askingrent} type="text" className="form-control" id="askingrent" name="askingrent" />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-3">
                    <div className="form-group">
                        <label htmlFor="propertyaddress">Property Address<span className="required">*</span>:</label>
                        <input value={values.propertyaddress} type="text" className="form-control" id="propertyaddress" name="propertyaddress" />
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="form-group">
                        <label htmlFor="taxaccno">Tax Acc No<span className="required">*</span>:</label>
                        <input value={values.taxaccno} type="text" className="form-control" id="taxaccno" name="taxaccno" />
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="form-group">
                        <label htmlFor="pgincome">Potential Gross Income<span className="required">*</span>:</label>
                        <input value={values.pgincome} type="text" className="form-control" id="pgincome" name="pgincome" />
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="form-group">
                        <label htmlFor="agincome">Actual Gross Income<span className="required">*</span>:</label>
                        <input value={values.agincome} type="text" className="form-control" id="agincome" name="agincome" />
                    </div>
                </div>
            </div>
            <button 
                type="submit" 
                className="btn btn-primary"
                onClick={increment}
            >Continue</button>
        </React.Fragment>
    );
}


function IncomeInformation(props) {
    const {incomeInfo, increment, decrement, addNewInfo, totalRent} = props;
    return (
        <React.Fragment>
            <h1>INCOME INFORMATION</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Suite#</th>
                        <th>Tenant(s)</th>
                        <th>SqFt.</th>
                        <th>Rent</th>
                        <th>Lease Term</th>
                        <th>Year <br />Lease Started</th>
                    </tr>
                </thead>
                <tbody>
                   { incomeInfo.map((val, idx) => {
                        return <SingleIncomeInfo key={idx} idx={idx} val={val} />
                    })}
                    <tr>
                        <td colSpan="3">Total Rent</td>
                        <td><h4>USD {totalRent}</h4></td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                    </tr>
                </tbody>
            </table>
            <button 
                type="submit" 
                className="btn btn-success"
                onClick={addNewInfo}
            >Add More Income Information</button>
            <button 
                type="submit" 
                className="btn btn-primary"
                onClick={increment}
            >Continue</button>
            <button 
                type="submit" 
                className="btn btn-default"
                onClick={decrement}
            >Back</button>
        </React.Fragment>
    )
}


function SingleIncomeInfo(props) {
    const {idx, val} = props;
    let suite = `suite-${idx}`, 
        tenant = `tenant-${idx}`, 
        sqft = `sqft-${idx}`,
        rent = `rent-${idx}`,
        lease = `lease-${idx}`,
        year = `year-${idx}`;
    return (
        <tr>
            <td>
                <div className="form-group">
                    <input value={val.suite} type="text"  className="form-control" name={suite} data-id={idx} data-name="suite" />
                </div>
            </td>
            <td>
                <div className="form-group">
                    <input value={val.tenant} type="text" className="form-control" name={tenant} data-id={idx} data-name="tenant" />
                </div>
            </td>
            <td>
                <div className="form-group">
                    <input value={val.sqft} type="text" className="form-control" name={sqft} data-id={idx} data-name="sqft" />
                </div>
            </td>
            <td>
                <div className="form-group">
                    <input value={val.rent} type="text" className="form-control" name={rent} data-id={idx} data-name="rent" />
                </div>
            </td>
            <td>
                <div className="form-group">
                    <input value={val.lease} type="text" className="form-control" name={lease} data-id={idx} data-name="lease" />
                </div>
            </td>
            <td>
                <div className="form-group">
                    <input value={val.year} type="text" className="form-control" name={year} data-id={idx} data-name="year" />
                </div>
            </td>
        </tr>
    )
}


function ExpensesInformation(props) {
    const {increment, decrement, values} = props;
    return (
        <React.Fragment>
            <h1>EXPENSES INFORMATION</h1>
            <div className="row">
                <div className="col-sm-6">
                    <div className="form-group">
                        <label htmlFor="propertytaxes">Property Taxes<span className="required">*</span>:</label>
                        <input value={values.propertytaxes} type="text" className="form-control" id="propertytaxes" name="propertytaxes" />
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <label htmlFor="insurance">Insurance<span className="required">*</span>:</label>
                        <input value={values.insurance} type="text" className="form-control" id="insurance" name="insurance" />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-6">
                    <div className="form-group">
                        <label htmlFor="management">Management<span className="required">*</span>:</label>
                        <input value={values.management} type="text" className="form-control" id="management" name="management" />
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <label htmlFor="maintenance">Maintenance<span className="required">*</span>:</label>
                        <input value={values.maintenance} type="text" className="form-control" id="maintenance" name="maintenance" />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-6">
                    <div className="form-group">
                        <label htmlFor="water">Water<span className="required">*</span>:</label>
                        <input value={values.water} type="text" className="form-control" id="water" name="water" />
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <label htmlFor="repairs">Repairs<span className="required">*</span>:</label>
                        <input value={values.repairs} type="text" className="form-control" id="repairs" name="repairs" />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-6">
                    <div className="form-group">
                        <label htmlFor="gas">Gas<span className="required">*</span>:</label>
                        <input value={values.gas} type="text" className="form-control" id="gas" name="gas" />
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <label htmlFor="janitoria">Janitorial<span className="required">*</span>:</label>
                        <input value={values.janitoria} type="text" className="form-control" id="janitoria" name="janitoria" />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-6">
                    <div className="form-group">
                        <label htmlFor="electric">Electric<span className="required">*</span>:</label>
                        <input value={values.electric} type="text" className="form-control" id="electric" name="electric" />
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <label htmlFor="trashremoval">Trash Removal<span className="required">*</span>:</label>
                        <input value={values.trashremoval} type="text" className="form-control" id="trashremoval" name="trashremoval" />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-6">
                    <div className="form-group">
                        <label htmlFor="advertising">Advertising<span className="required">*</span>:</label>
                        <input value={values.advertising} type="text" className="form-control" id="advertising" name="advertising" />
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <label htmlFor="legalfees">Legal Fees<span className="required">*</span>:</label>
                        <input value={values.legalfees} type="text" className="form-control" id="legalfees" name="legalfees" />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-6">
                    <div className="form-group">
                        <label htmlFor="others">Others<span className="required">*</span>:</label>
                        <input value={values.others} type="text" className="form-control" id="others" name="others" />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-6">
                    <div className="form-group">
                        <h4>Total Fees: USD {values.totalExpenses}</h4>
                    </div>
                </div>
            </div>
            <button 
                type="submit" 
                className="btn btn-primary"
                onClick={increment}
            >Continue</button>
            <button 
                type="submit" 
                className="btn btn-default"
                onClick={decrement}
            >Back</button>
        </React.Fragment>
    )
}


function TenantReimbursement(props) {
    const {values, increment, decrement} = props;
    return (
        <React.Fragment>
            <h3>TENANT REIMBURSEMENT <small>If applies</small></h3>
            <div className="row">
                <div className="col-sm-3">
                    <div className="form-group">
                        <label htmlFor="taxes1">Taxes<span className="required">*</span>:</label>
                        <input value={values.taxes1} type="text" className="form-control" id="taxes1" name="taxes1" />
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="form-group">
                        <label htmlFor="insurance1">Insurance<span className="required">*</span>:</label>
                        <input value={values.insurance1} type="text" className="form-control" id="insurance1" name="insurance1" />
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="form-group">
                        <label htmlFor="electric1">Electric<span className="required">*</span>:</label>
                        <input value={values.electric1} type="text" className="form-control" id="electric1" name="electric1" />
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="form-group">
                        <label htmlFor="repairs1">Repairs<span className="required">*</span>:</label>
                        <input value={values.repairs1} type="text" className="form-control" id="repairs1" name="repairs1" />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-3">
                    <div className="form-group">
                        <label htmlFor="trashremoval1">Trash Removal<span className="required">*</span>:</label>
                        <input value={values.trashremoval1} type="text" className="form-control" id="trashremoval1" name="trashremoval1" />
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="form-group">
                        <label htmlFor="janitorial1">Janitorial<span className="required">*</span>:</label>
                        <input value={values.janitorial1} type="text" className="form-control" id="janitorial1" name="janitorial1" />
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="form-group">
                        <label htmlFor="maintenance1">Maintenance<span className="required">*</span>:</label>
                        <input value={values.maintenance1} type="text" className="form-control" id="maintenance1" name="maintenance1" />
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="form-group">
                        <label htmlFor="others1">Others<span className="required">*</span>:</label>
                        <input value={values.others1} type="text" className="form-control" id="others1" name="others1" />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-6">
                    <div className="form-group">
                        <h4>Total Fees: USD {values.totalReimbursement}</h4>
                    </div>
                </div>
            </div>
            <button 
                type="submit" 
                className="btn btn-primary"
                onClick={increment}
            >Affirm Correct Details</button>
            <button 
                type="submit" 
                className="btn btn-default"
                onClick={decrement}
            >Back</button>
        </React.Fragment>
    )
}

function ConfirmClientDetails(props) {
    const { decrement, values, postDataToServer } = props;
    let totalRent = 0;
    for (let index = 0; index < values.income_info.length; index++) {
        let singleRent = values.income_info[index]['rent'];
        let subRent = isNaN(parseInt(singleRent, 10)) ? 0 : parseInt(singleRent, 10);
        totalRent = totalRent + subRent;
    }
    console.log(totalRent);
    return (
        <React.Fragment>
            <div className="row">
                <div className="col-sm-12">
                    <h2>CLIENT DETAILS</h2>
                    <div className="table-responsive">
                        <table className="table table-striped confirm-dtails">
                            <tbody>
                            <tr>
                                <td>
                                    <h3>{ values.clientname }</h3>
                                    <p>Client Name</p>
                                </td>
                                <td>
                                    <h3>{ values.glarea }</h3>
                                    <p>Gross Leaseable Area</p>
                                </td>
                                <td>
                                    <h3>{ values.vacantarea }</h3>
                                    <p>Vacant Area</p>
                                </td>
                                <td>
                                    <h3>{ values.askingrent }</h3>
                                    <p>Asking Rent</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h3>{ values.propertyaddress }</h3>
                                    <p>Property Address</p>
                                </td>
                                <td>
                                    <h3>{ values.taxaccno }</h3>
                                    <p>Tax Acc. No</p>
                                </td>
                                <td>
                                    <h3>{ values.pgincome }</h3>
                                    <p>Potential Gross Income</p>
                                </td>
                                <td>
                                    <h3>{ values.agincome }</h3>
                                    <p>Actual Gross Income</p>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-sm-12">
                    <h2>INCOME INFORMATION</h2>
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Suite#</th>
                                    <th>Tenant(s)</th>
                                    <th>SqFt.</th>
                                    <th>Rent (USD)</th>
                                    <th>Lease Term(Yrs)</th>
                                    <th>Year <br />Lease Started</th>
                                </tr>
                            </thead>
                            <tbody>
                                {values.income_info.map((info, id) => {
                                    return (
                                        <tr key={id}>
                                            <td>
                                                <h3>{info.suite}</h3>
                                            </td>
                                            <td>
                                                <h3>{info.tenant}</h3>
                                            </td>
                                            <td>
                                                <h3>{info.sqft}</h3>
                                            </td>
                                            <td>
                                                <h3>{info.rent}</h3>
                                            </td>
                                            <td>
                                                <h3>{info.lease}</h3>
                                            </td>
                                            <td>
                                                <h3>{info.year}</h3>
                                            </td>
                                        </tr>
                                    )
                                })}
                                
                                <tr>
                                    <td colSpan="3"><h3>Total Rent</h3></td>
                                    <td><h3>USD {totalRent}</h3></td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        
            <div className="row">
                <div className="col-sm-12">
                    <h2>EXPENSES INFORMATION (USD)</h2>
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <tbody>
                                <tr>
                                    <td>
                                        <h3>{values.propertytaxes}</h3>
                                        <p>Property Taxes</p>
                                    </td>
                                    <td>
                                        <h3>{values.insurance}</h3>
                                        <p>Insurance</p>
                                    </td>
                                    <td>
                                        <h3>{values.management}</h3>
                                        <p>Management</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h3>{values.maintenance}</h3>
                                        <p>Maintenance</p>
                                    </td>
                                    <td>
                                        <h3>{values.water}</h3>
                                        <p>Water</p>
                                    </td>
                                    <td>
                                        <h3>{values.repairs}</h3>
                                        <p>Repairs</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h3>{values.gas}</h3>
                                        <p>Gas</p>
                                    </td>
                                    <td>
                                        <h3>{values.janitoria}</h3>
                                        <p>Janitorial</p>
                                    </td>
                                    <td>
                                        <h3>{values.electric}</h3>
                                        <p>Electric</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h3>{values.trashremoval}</h3>
                                        <p>Trash Removal</p>
                                    </td>
                                    <td>
                                        <h3>{values.advertising}</h3>
                                        <p>Advertising</p>
                                    </td>
                                    <td>
                                        <h3>{values.legalfees}</h3>
                                        <p>Legal Fees</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h3>{values.others}</h3>
                                        <p>Others</p>
                                    </td>
                                    <td>
                                        <h3>&nbsp;</h3>
                                        <p>&nbsp;</p>
                                    </td>
                                    <td>
                                        <h3>&nbsp;</h3>
                                        <p>&nbsp;</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td><h3>Total</h3></td>
                                    <td colspan="2"><h3>USD {values.totalExpenses}</h3></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        
            <div className="row">
                <div className="col-sm-12">
                    <h2>TENANT REIMBURSEMENT (USD)</h2>
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <tbody>
                                <tr>
                                    <td>
                                        <h3>{values.taxes1}</h3>
                                        <p>Taxes</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h3>{values.insurance1}</h3>
                                        <p>Insurance</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h3>{values.electric1}</h3>
                                        <p>Electric</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h3>{values.repairs1}</h3>
                                        <p>Repairs</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h3>{values.trashremoval1}</h3>
                                        <p>Trash Removal</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h3>{values.janitorial1}</h3>
                                        <p>Janitorial</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h3>{values.maintenance1}</h3>
                                        <p>Maintenance</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h3>{values.others1}</h3>
                                        <p>Others</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td><h3>Total: USD {values.totalReimbursement}</h3></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>                   
        
            <div className="row">
                <div className="col-sm-12">
                    <button 
                    className="btn btn-success"
                    onClick={postDataToServer}
                >{values.inProgress ? `Form Is Now Submitted...` : `Submit Your Details`}</button>
                    <button 
                        className="btn btn-default"
                        onClick={decrement}
                    >Back & Edit Details</button>
                </div>
            </div>

            <div className="row">
                <div className="col-sm-12">
                {values.mailSent && <div className="alert alert-success"><strong>Success!</strong> Thank You For Filling And Submitting Your Form</div>}
                {values.error && <div class="alert alert-danger"><strong>Error!</strong> Sorry, We Are Experiencing An Error. Please Try Again Later.</div>}
                </div>
            </div>
        </React.Fragment>
    )
}

let domContainer = document.querySelector('#mycontainer');
ReactDOM.render(<App />, domContainer);