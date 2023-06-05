import { Stack } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";

const LoadingSkeleton = () => {
  return (
    <Stack>
      <Skeleton height='45px' />
      <Skeleton height='45px' />
      <Skeleton height='45px' />
      <Skeleton height='45px' />
      <Skeleton height='45px' />
      <Skeleton height='45px' />
      <Skeleton height='45px' />
      <Skeleton height='45px' />
      <Skeleton height='45px' />
      <Skeleton height='45px' />
      <Skeleton height='45px' />
      <Skeleton height='45px' />
    </Stack>
  );
};

export default LoadingSkeleton;
