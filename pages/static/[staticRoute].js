import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import React from 'react'
import PrivacyPolicyStaticPage from '../../components/Common/StaticPages/PrivacyPolicyStaticPage'
import TermsAndConditionsStaticPage from '../../components/Common/StaticPages/TermsAndConditionsStaticPage';
import FAQStaticPage from '../../components/Common/StaticPages/FAQStaticPage';

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

        default:
            return <ErrorPage statusCode={404} />
    }
}

export default PrivacyPolicy