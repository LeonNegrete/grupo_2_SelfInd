import React from 'react';
import ContentRowCenter from './ContentRowCenter';
import ContentRowCards from './ContentRowCards';
import Chart from './Chart';

function ContentRowTop(){
    return(
        <React.Fragment>
				{/*<!-- Content Row Top -->*/}
				<div className="container-fluid">
					<div className="d-sm-flex aligns-items-center justify-content-between mb-4">
						<h1 className="h3 mb-0 mt-3 text-gray-800">SelfInd Dashboard</h1>
					</div>
				
					{/*<!-- Content Row Movies-->*/}
					<ContentRowCards />
					<ContentRowCenter />
					<Chart />
	
				</div>
				{/*<!--End Content Row Top-->*/}

        </React.Fragment>
    )

}
export default ContentRowTop;