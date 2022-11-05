import Image from 'next/image';

import Card from '../../Card';
import Form from '../../Form';
import AuthStyles from './Auth.module.css';

const Auth = ({ formData, handleSubmit, className, children }) => {
    return (
        <div className={AuthStyles.container}>
            <Card
                flexDisplay={'col'}
                className="w-full md:w-2/3 lg:w-1/3"
            >
                <Image src={'/Logo.svg'} alt="logo" width={64} height={64} />
                <Form
                    formData={formData}
                    onSubmit={handleSubmit}
                    className={`${className} flex flex-col gap-4`}
                >
                    {children}
                </Form>
            </Card>
        </div>
    )
}

export default Auth;