describe('Twitter Block plugin tests', function () {

	it('Disable Twitter Block', function () {
		cy.login('admin', 'admin', 'publicknowledge');

		cy.get('ul[id="navigationPrimary"] a:contains("Settings")').click();
		cy.get('ul[id="navigationPrimary"] a:contains("Website")').click();
		cy.get('button[id="plugins-button"]').click();

		// disable plugin if enabled
		cy.get('input[id^="select-cell-twitterblockplugin-enabled"]').then($btn => {
			if ($btn.attr('checked') === 'checked') {
				cy.get('input[id^="select-cell-twitterblockplugin-enabled"]').click();
				cy.get(
					'div[class*="pkp_modal_panel"] button[class*="pkpModalConfirmButton"]'
				).click();
				cy.get(
					'div:contains(\'The plugin "Twitter Block" has been disabled.\')'
				);
			}
		});
	});

	it('Enable Twitter Block', function () {
		cy.login('admin', 'admin', 'publicknowledge');

		cy.get('ul[id="navigationPrimary"] a:contains("Settings")').click();
		cy.get('ul[id="navigationPrimary"] a:contains("Website")').click();
		cy.get('button[id="plugins-button"]').click();

		// Find and enable the plugin
		cy.get('input[id^="select-cell-twitterblockplugin-enabled"]').click();
		cy.get('div:contains(\'The plugin "Twitter Block" has been enabled.\')');
		cy.get(
			'tr[id="component-grid-settings-plugins-settingsplugingrid-category-blocks-row-twitterblockplugin"] a[class="show_extras"]'
		).click();
		cy.get(
			'a[id^="component-grid-settings-plugins-settingsplugingrid-category-blocks-row-twitterblockplugin-settings-button"]'
		).click();
		cy.waitJQuery();

		// Fill out settings form
		cy.get('form[id="twitterSettings"] input[name="tweetTitle"]')
			.clear()
			.type(
				'Tweets by <a href="https://twitter.com/JohnWillinsky" target="_blank">@JohnWillinsky</a>'
			);
		cy.get('form[id="twitterSettings"] input[name="tweetUrl"]')
			.clear()
			.type('https://twitter.com/JohnWillinsky');
		cy.get('form[id="twitterSettings"] input[name="tweetColor"]')
			.clear()
			.type('#555555');
		cy.get('form[id="twitterSettings"] input[name="tweetHeight"]')
			.clear()
			.type('500');
		cy.get('form[id="twitterSettings"] input[name="tweetOptions"]')
			.clear()
			.type('nofooter noborders noheader');
		cy.get('form[id="twitterSettings"] input[name="tweetDataLimit"]')
			.clear()
			.type('6');
		// submit settings form
		cy.get('form[id="twitterSettings"] button[id^="submitFormButton"]').click();
		cy.waitJQuery();

		// enable block in sidebar if disabled
		cy.get('ul[id="navigationPrimary"] a:contains("Settings")').click();
		cy.get('ul[id="navigationPrimary"] a:contains("Website")').click();
		cy.get('div[class*="pkpTabs--side"] button[id="setup-button"]').click();
		cy.get(
			'div[class*="pkpTabs--side"] #setup input[value="twitterblockplugin"]'
		).then($btn => {
			if ($btn.attr('checked') !== 'checked' && $btn.attr('checked') !== true) {
				cy.get(
					'div[class*="pkpTabs--side"] #setup input[value="twitterblockplugin"]'
				).check();
				cy.get(
					'div[class*="pkpTabs--side"] #setup div[class="pkpFormPage__buttons"] button[class="pkpButton"]'
				).click();
			}
		});
		// go to journal index
		cy.get('ul[id="navigationUser"] li[class="view_frontend"] a').click();
		cy.get('div[class*="block_twitter"]');
		cy.get('div[class*="block_twitter"]:contains("@JohnWillinsky")');
	});
});
