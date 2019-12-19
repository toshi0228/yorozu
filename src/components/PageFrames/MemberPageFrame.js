import React from 'react'
import { connect } from 'react-redux'
import { Layout } from 'antd'
import Header from '../Layouts/MemberHeader'
import Footer from '../Layouts/Footer'
import { toggleMenu } from '../../actions/apps'
import { fetchCurrentAccount, selfSignOut } from '../../actions/accounts'
import SideBar from '../../components/Layouts/SideBar'
import styles from './index.module.scss'
import EventListener from 'react-event-listener'

const { Content } = Layout

class MemberPageFrame extends React.Component {
  componentDidMount() {
    this.props.fetchProfile()
    this.handleResize()
  }

  handleResize = () => {
    const { openMenu, closeMenu } = this.props
    window.innerWidth >= 768 ? openMenu() : closeMenu()
  }

  render() {
    const { children, app, account } = this.props
    return (
      <Layout className={styles.memberPageFrame}>
        <SideBar isMenuCollapsed={app.isMenuCollapsed} />
        <EventListener target="window" onResize={this.handleResize} />
        <Layout>
          <Header
            app={app}
            account={account}
            toggleMenu={this.props.toggleMenu}
            signOut={this.props.signOut}
          />
          <Content className={styles.content}>{children}</Content>
          <Footer />
        </Layout>
      </Layout>
    )
  }
}

const mapStateToProps = ({ app, account, nursery }) => ({
  app,
  account: account,
})

const mapDispatchToProps = dispatch => ({
  toggleMenu: () => dispatch(toggleMenu()),
  signOut: () => dispatch(selfSignOut()),
  fetchProfile: () => dispatch(fetchCurrentAccount()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MemberPageFrame)
