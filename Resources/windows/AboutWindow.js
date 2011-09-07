/**
 * This file is part of DrupalCon Mobile.
 *
 * DrupalCon Mobile is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * DrupalCon Mobile is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with DrupalCon Mobile.  If not, see <http://www.gnu.org/licenses/>.
 */

(function() {
	
  DrupalCon.ui.createAboutWindow = function() {
    var aboutWindow = Titanium.UI.createWindow({
      id: 'aboutWindow',
      title: 'About',
      backgroundColor: '#FFF',
      barColor: '#414444',
      navBarHidden: false
    });

    // create table view data object
    var data = [
      {
      	title: 'About Codestrong', 
      	shortTitle:'Codestrong',
      	page: 'pages/about.html'
      },
      {
      	title: 'About The App', 
      	shortTitle:'The App', 
      	page: 'pages/app.html'
      }
    ];
    
    var tabbedBarView = Ti.UI.createView({
    	backgroundColor:'#CE3016',
    	borderColor: '#000',
    	borderWidth: 1,
    	top:0,
    	height:36
    });
    var tabbedBar = Ti.UI.createView({
    	height:36,
    	width:204,
    	layout:'horizontal'
    });
    
    for (var i = 0; i < data.length; i++) {
    	var myEntry = data[i];
    	
    	myEntry.webview = Ti.UI.createWebView({url: myEntry.page});
    	var tabView = Ti.UI.createView({
			top:3,
			backgroundImage: (i == 0) ? 'images/BUTT_drk_on.png' : 'images/BUTT_drk_off.png',
			borderRadius:8,
			borderColor:'#000',
			height:30,
			width: 100,
			index: i
		});
		var tabLabel = Ti.UI.createLabel({
			text: myEntry.shortTitle,
			textAlign:'center',
			color: '#fff',
			height:'auto',
			width:'100%',
			touchEnabled: false,
			font: {
				fontSize:14	
			}
		});
		
		tabView.addEventListener('click', function(e) {
			for (var j = 0; j < data.length; j++) {
				data[j].tabView.backgroundImage = 'images/BUTT_drk_off.png';
				if (e.source.index == j) {
					scrollable.scrollToView(data[j].webview);
				}
			}
			e.source.backgroundImage = 'images/BUTT_drk_on.png';
		});
		
		tabView.add(tabLabel);
		if (i != 0) {
			tabbedBar.add(Ti.UI.createView({width:3}));
		}
        tabbedBar.add(tabView);
        myEntry.tabView = tabView;	
    }
    
    var scrollable = Ti.UI.createScrollableView({
		showPagingControl: true,
		backgroundColor: '#000000',
		top:30,
		views:[
			data[0].webview,
			data[1].webview
		]
	});
	scrollable.addEventListener('scroll', function(e) {
		if (e.view) {
			data[e.currentPage].tabView.fireEvent('click');
		}
	});
	
	if (!isAndroid()) {
		Titanium.Gesture.addEventListener('orientationchange', function(e){   
	    	scrollable.scrollToView(scrollable.currentPage);   
		});
	}
	
	aboutWindow.add(scrollable);
	tabbedBarView.add(tabbedBar);	
	aboutWindow.add(tabbedBarView);
	
	Ti.App.addEventListener('app:open_link', function(e) {
		Ti.Platform.openURL(e.link);
	});

    return aboutWindow;
  };

})();
