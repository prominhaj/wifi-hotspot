export const sendSMS = async (number, message) => {
    const apiUrl = `https://bulksmsbd.net/api/smsapi?api_key=${process.env.SMS_API_KEY}&type=text&number=${number}&senderid=8809617613576&message=${message}`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data?.response_code === 202) {
            return {
                message: 'SMS sent successfully',
                success: true
            };
        } else if (data?.response_code === 1001) {
            return {
                message: 'Invalid Phone Number',
                success: false
            };
        }
        else if(data?.response_code === 1006) {
            return {
                message: "SMS Sent Failed!!!"
            }
        }
    } catch (error) {
        throw new Error(error);
    }
};
