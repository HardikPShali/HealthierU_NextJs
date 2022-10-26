import { useRouter } from 'next/router';
import PrivacyPolicyStaticPage from '../../components/Common/StaticPages/PrivacyPolicyStaticPage'
import TermsAndConditionsStaticPage from '../../components/Common/StaticPages/TermsAndConditionsStaticPage';
import FAQStaticPage from '../../components/Common/StaticPages/FAQStaticPage';
import HelpAndSupportStaticPage from '../../components/Common/StaticPages/HelpAndSupportStaticPage';

const PrivacyPolicy = () => {
    const router = useRouter();
    const { staticRoute } = router.query;

    switch (staticRoute) {
        case 'privacy-policy':
            return <PrivacyPolicyStaticPage />

        case 'terms-and-conditions':
            return <TermsAndConditionsStaticPage />

        case 'faq-page':
            return <FAQStaticPage />

        case 'help-and-support':
            return <HelpAndSupportStaticPage />

        default:
            return <></>
    }
}

export default PrivacyPolicy