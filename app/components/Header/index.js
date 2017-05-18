import React, { Component } from 'react'
import { Link } from 'react-router'
import styles from './Header.scss'
import { Layout, Row, Col } from 'antd'

import { Icon, Tooltip } from 'antd'

const LayoutHeader = Layout.Header

export default class Header extends Component {

    internetStatus() {
        const type = this.props.watchers.internet_connected ? "link" : "disconnect"
        const title = this.props.watchers.internet_connected ? "You are connected to the internet" : "You have no internet connectivity"
        return (
            <Tooltip placement="bottomRight" title={title}>
                <Icon type={type} />
            </Tooltip>
        )
    }

    render() {
        return (
            <LayoutHeader className={styles.header}>
                <Row>
                    <Col span={8}>
                        <Link to="/" className="header__logo">langiappe</Link>
                    </Col>
                    <Col span={16} className={styles.devopsHealth}>
                        {this.internetStatus()}
                        <Link to="/config">
                            <Icon type="setting" />
                        </Link>
                    </Col>
                </Row>
            </LayoutHeader>
        )
    }
}
