export const METHOD_DATA_ANDROID = [
  {
    supportedMethods: ["android-pay"],
    data: {
      supportedNetworks: ["visa", "mastercard", "amex"],
      currencyCode: "USD",
      environment: "TEST", // defaults to production
      paymentMethodTokenizationParameters: {
        tokenizationType: "GATEWAY_TOKEN",
        parameters: {
          gateway: "stripe",
          gatewayMerchantId:
            "pk_test_51IOJnjIViNNTbrN2XEP9Bae7HL2bBRKBHNAVyrpwrMA9SX2vT56gFFU0lQfvbWnPyvaI5EkpYRklcoSaA3u86C2K00E80uadJC",
        },
      },
    },
  },
];
export const METHOD_DATA_IOS = [
  {
    supportedMethods: ["apple-pay"],
    data: {
      merchantIdentifier: "merchant.com.your-app.namespace",
      supportedNetworks: ["visa", "mastercard", "amex"],
      countryCode: "US",
      currencyCode: "USD",
    },
  },
];
