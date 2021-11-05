import client from '@util/api'
import moment from 'moment'

const handleSubmit = async (data, actions, audio_tag) => {
  var duration = audio_tag.duration

  var user_mail = data.user.email
  var user = {
    category: 'citizen',
    username: user_mail
  }

  var upload_timestamp = moment().unix()

  if (data.tags) {
    var tags = [
      {
        username: user_mail,
        version: '',
        timestamp: upload_timestamp,
        source_tags: data.tags
      }
    ]
  } else {
    var tags = []
  }

  var full_data = {
    name: data.name,
    description: data.description,
    format: data.file.type,
    size: data.file.size,
    duration: duration,
    recorded_at: moment(data.recorded_at).unix(),
    uploaded_at: upload_timestamp,
    latitude: data.latitude,
    longitude: data.longitude,
    data: data.data,
    recording_device: data.recording_device,
    user: user,
    tags: tags
  }

  return new Promise((resolve, reject) => {
    client
      .post('/audios', full_data)
      .then(function (res) {
        if (res.status == 200) {
          actions.resetForm()
          actions.setSubmitting(false)
          document.getElementById('audioFile').value = ''
        }
        resolve(res)
      })
      .catch(function (error) {
        resolve(error)
      })
  })
}
export default handleSubmit