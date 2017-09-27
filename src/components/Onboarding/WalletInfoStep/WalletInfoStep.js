import React from 'react';
import OnboardingInputField from './OnboardingInputField/OnboardingInputField';

const WalletInfoStep = props => (
	<div className="onboarding--card wallet--info--card">
		<div className="onboarding--card--header">
			<h3>Hi, {props.currentUser.displayName || props.currentUser.email}</h3>
			<p>We just need a little more information to personalize your experience</p>
		</div>
		<div className="onboarding--wallet--info">
			<p>
				Enter the amount of each coin you own and your wallet address. We use the amount to calculate your total
				balance and keep your wallet addresses easily available to you.
			</p>
			<div className="onboarding--wallet--info--header">
				<h4 className="onboarding--wallet--coin--header">Coin</h4>
				<h4 className="onboarding--wallet--amount--header">Amount</h4>
				<h4 className="onboarding--wallet--address--header">Wallet Address</h4>
			</div>
			<form>
				{props.selectedCurrencies.map(currency => {
					return (
						<OnboardingInputField
							name={currency.name}
							img={currency.img}
							key={currency.id}
							symbol={currency.symbol}
						/>
					);
				})}
				<div className="onboarding--wallet--buttons--container">
					<div className="onboarding--wallet--skip--button">I'll do this later</div>
					<button
						type="submit"
						onClick={props.handleWalletInfoSubmit}
						className="main-button onboarding--finish--button"
					>
						Finish
					</button>
				</div>
			</form>
		</div>
	</div>
);

export default WalletInfoStep;
