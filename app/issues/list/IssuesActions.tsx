import { Box, Button } from '@radix-ui/themes'
import Link from 'next/link'

const IssuesActions = () => {
  return (
    <Box className='mb-5'>
          <Button>
            {" "}
            <Link href={"/issues/new"}>New Issue</Link>
          </Button>
        </Box>
  )
}

export default IssuesActions