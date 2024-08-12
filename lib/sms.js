export const sendSMS = async (number, message) => {
    const apiUrl = `https://bulksmsbd.net/api/smsapi?api_key=${process.env.SMS_API_KEY}&type=text&number=${number}&senderid=8809617613576&message=${message}`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data?.success_message) {
            return true;
        }
    } catch (error) {
        throw new Error(error);
    }
};
