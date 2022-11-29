import React, { Component } from 'react'
import Navbar from '../components/navbar/navbar'

export default class Main extends Component {
  render() {
    return (
        <div className="main-wrapper">
            <div className='row'>
                {/* Sidebar Should Goes Here */}

                {/* Sidebar Should Ends Here */}


                {/* Main Container Should Goes Here */}

                    <section>
                        {/* Navbar Should Goes Here */}
                            <Navbar />
                        {/* Navbar Should Ends Here */}

                        {/* Main Container Should Goes Here */}
                            <div className='container'>
                                
                            </div>
                        {/* Main Container Should Ends Here */}

                        {/* Footer Should Goes Here  */}
                            <footer>

                            </footer>
                        {/* Footer Should Ends Here  */}
                    </section>

                {/* Main Container Should Ends Here */}
            </div>
        </div>
    )
  }
}
