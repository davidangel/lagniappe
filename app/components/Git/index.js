import React, { Component } from 'react'
import { Link } from 'react-router'
import { Button, Row, Col, Spin, Icon, Menu } from 'antd'

import CurrentBranch from 'commands/Git/CurrentBranch'
import Status from 'commands/Git/Status'
import Checkout from 'commands/Git/Checkout'
import Branches from './Branches'
import Operations from './Operations'

import config from 'config'
import styles from './Git.scss'

import Log from './Log'

export default class Git extends Component
{

    constructor(props) {
        super(props)
        this.state = {
            currentBranch: '',
            loading: false
        }
    }

    componentWillMount() {
        this.getCurrentBranch()
    }

    handleRefresh() {
        this.getCurrentBranch()
        this.refs.log.getLog()
        this.refs.branches.getBranches()
    }

    getCurrentBranch() {
        this.setState({
            currentBranch: '',
            loading: true
        })
        let currentBranch = new CurrentBranch()
        currentBranch.execute(config.cwd).then(branch => {
            this.setState({
                currentBranch: branch,
                loading: false
            })
        })
    }

    switchToBranch(branch) {
        const branchParts = branch.split('/')
        const branchName = branchParts.pop()
        let checkoutBranch = new Checkout()
        this.setState({
            currentBranch: '...',
            loading: true
        })
        checkoutBranch.execute(branchName, config.cwd).then(() => {
            this.handleRefresh()
        })
    }

    render() {
        const loading = !! this.state.loading
        const rendered = this.renderPage()
        const className = loading ? styles.loading : ''
        return (
            <div className={className}>
                {rendered}
            </div>
        )
    }

    renderPage() {
        const currentBranch = this.state.currentBranch
        return (
            <div>
                <Row>
                    <Col span={24}>
                        <h1><Icon type="copy" /> Git</h1>
                        <h4>
                            <span className="headingGhost headingGhost--block">Current Branch:</span>
                            <Button type="default" shape="circle" icon="retweet" size="small" onClick={this.handleRefresh.bind(this)} />
                            &nbsp;&nbsp;
                            {currentBranch}
                        </h4>
                    </Col>
                </Row>
                <Row className="t-spacing--large" gutter={16}>
                    <Col span={14}>
                        <Log ref="log" />
                    </Col>
                    <Col span={10}>
                        <Operations branch={currentBranch} />
                        <Branches ref="branches" switchToBranch={this.switchToBranch.bind(this)} />
                    </Col>
                </Row>
            </div>
        )
    }

}
