import { useRuntimeConfig } from '#app'
import { CloudWatchLogsClient, PutLogEventsCommand } from '@aws-sdk/client-cloudwatch-logs'

export const useCloudwatchLogger = () => {
  const config = useRuntimeConfig().public
  const authUser = useAuthUser()

  const client = new CloudWatchLogsClient({
    region: config.cloudwatchRegion,
    credentials: {
      accessKeyId: config.cloudwatchAccessKeyId,
      secretAccessKey: config.cloudwatchSecretAccessKey
    }
  })

  const sendLog = async (file, msg) => {
    // console.log('0', config.cloudwatchRegion)
    // console.log('1', config.cloudwatchAccessKeyId)
    // console.log('2', config.cloudwatchSecretAccessKey)

    const user = authUser.value.account

    // admin 分開儲存到不同串流
    const streamName = user == 'admin' ? 'admin' : 'user'
    // 訊息包括：用戶資訊、在哪個檔案、內容
    const message = JSON.stringify({
      user,
      file,
      msg
    })

    const command = new PutLogEventsCommand({
      logGroupName: 'skvip',
      logStreamName: streamName,
      logEvents: [
        {
          timestamp: Date.now(),
          message: message
        }
      ]
    })
    console.log('送cloudwatch', message)

    try {
      await client.send(command)
      console.log('Log sent successfully')
    } catch (error) {
      console.error('Error sending log:', error)
    }
  }

  return { sendLog }
}
